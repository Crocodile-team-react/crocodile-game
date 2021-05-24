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
      socket.avatarID = session.avatarID;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username, session not found"));
  }
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  socket.avatarID = socket.handshake.auth.avatarID;
  next();
});

io.on("connection", function (socket) {
  console.log("New connection: " + socket.id);
  sessionStore.saveSession(socket.sessionID, {
    username: socket.username,
    userID: socket.userID,
    avatarID: socket.avatarID,
    connected: true,
    socket: socket,
  })
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
    username: socket.username,
    avatarID: socket.avatarID,
  })
  socket.on("room:getInfo", callback => {
    callback(roomStore);
  });
  socket.on("game:start", () => {
    let roomID = socket.roomID;
    let users = roomStore.gameStart(roomID);
    let room = roomStore.getRoom(roomID);
    let roomWord = room.roomWord; // need make array from word
    users.forEach((user) => {
      io.to(user.socketID).emit("game:start", {users}); // need make function 
    });
    let timer = setInterval(() => {
      room.gameCounter = room.gameCounter - 1;
      if (room.gameCounter === 170) {
        users.forEach((user) => {
          let letter = roomWord[roomWord.length - 1];
          io.to(user.socketID).emit("game:newLetter", letter); // send word array
        });
      }
      if (room.gameCounter === 160) {
        users.forEach((user) => {
          let letter = roomWord[0];
          io.to(user.socketID).emit("game:newLetter",);
        });
      }
      if (room.gameCounter === 0) {
        clearInterval(timer);
        // users.forEach((user) => {
        //   io.to(user.socketID).emit("game:start", users); -> timer end event
        // });
      }
    }, 1000);
  });
  socket.on("game:wordChoose", (word) => {
    let roomID = socket.roomID;
    roomStore.setRoomWord
  });
  socket.on("room:kickPlayer", userID => {
    let roomID = socket.roomID;
    let hostID = socket.userID;
    let response = roomStore.kickUser(roomID, hostID, userID);
    if (response.status === "success") {
      io.to(response.removedUser.socketID).emit("room:kicked");
      let users = roomStore.getRoomUsers(socket.roomID);
      users.forEach((user) => {
        io.to(user.socketID).emit("room:userKicked", userID);
      });
    }
  });
  socket.on("room:host", (callback) => {
    let roomID = roomStore.createNewRoom({
      userID: socket.userID,
      username: socket.username,
      socketID: socket.id,
    }, true); // true => room opened
    callback(roomID)
  })
  socket.on("room:isRoomExist", (room, callback) => {
    let response = roomStore.isRoomAvailable(room.roomID);
    callback(response);
  });
  socket.on("room:join", (room, callback) => {
    let newUser = {
      userID: socket.userID,
      username: socket.username,
      socketID: socket.id,
      avatarID: socket.avatarID,
      pointCount: 10,
      leader: false,
    };
    let response = roomStore.joinRoom(room.roomID, newUser);
    let users = [];
    if (response.status === "success") {  
      socket.roomID = room.roomID;
      users = roomStore.getRoomUsers(room.roomID);
      users.forEach((user) => {
        socket.to(user.socketID).emit("room:userJoin", newUser);
      });
      callback({
        response,
        users,
      });
    } else {
      callback({response});
    }
  })
  socket.on("room:leave", () => {
    socketLeaveRoom(socket);
  });
  socket.on("disconnect", () => {
    socketLeaveRoom(socket);
  })
});

http.listen(PORT, () => {
  console.log("Server has been started on " + PORT);
});

const socketLeaveRoom = (socket) => {
  if (socket.roomID) {
    let removedUser = roomStore.leaveRoom(socket.roomID, socket.userID);
    if (removedUser) {
      let users = roomStore.getRoomUsers(socket.roomID);
      users.forEach((user) => {
        socket.to(user.socketID).emit("room:userLeave", socket.userID);
      });
    }
  }
}
