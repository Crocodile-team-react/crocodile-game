import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { InMemorySessionStore } from './helpers/sessionStore.js';
import { InMemoryRoomStore } from "./helpers/roomStore.js";
import randomId from './helpers/random.js';

const app = express();
const http = createServer(app);
const PORT = process.env.PORT || 5000;



const sessionStore = new InMemorySessionStore();
const roomStore = new InMemoryRoomStore();

const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

app.get('/', (req, res) => {
  res.send("Privet");
})

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  next();
});

io.on("connection", function (socket) {
  sessionStore.saveSession(socket.sessionID, {
    username: socket.username,
    userID: socket.userID,
    connected: true,
    socket: socket,
  })
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
    username: socket.username
  })
  socket.on("room:host", (callback) => {
    let roomID = roomStore.createNewRoom({
      userID: socket.userID,
      username: socket.username
    }, true); // true => room opened
    callback(roomID)
  })
  socket.on("room:join", (room, callback) => {
    let hostID = roomStore.joinRoom({
      userID: socket.userID,
      username: socket.username
    }, room.roomID);
    let users = [];
    if (hostID) {
      socket.roomID = room.roomID;
      users = roomStore.getRoomUsers(room.roomID);
    }
    callback({
      hostID: hostID,
      roomStore,
      users,
    });
  })
  socket.on("disconnect", () => {
    if (socket.roomID) {
      roomStore.leaveRoom(socket.userID, socket.roomID);
    }
  })
});

http.listen(PORT, () => {
  console.log("Server has been started on " + PORT);
});

const returnRoomID = (roomID, socket) => {
  socket.emit("room:host", roomID);
}

