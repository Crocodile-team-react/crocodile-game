import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const http = createServer(app);
const PORT = process.env.PORT || 5000;

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
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", function (socket) {
  console.log("new connection " + socket.id);
  
  socket.emit("user-id", "your id is " + socket.id);

  socket.on("join_room", (msg) => {
    socket.join(msg.room);
    socket.to(msg.room).emit("room_new_user", {
      username: socket.username,
      userID: socket.id,
    });
    const clients = io.sockets.adapter.rooms.get(msg.room);
    const clientsArr = [];
    for (const clientID of clients) {
      const clientSocket = io.sockets.sockets.get(clientID);
      clientsArr.push({
        username: clientSocket.username,
        userID: clientSocket.id
      })
    }
    socket.emit('room_users', clientsArr);
  })

  socket.on("leave_room", () => {
    socketLeaveRoom(socket);
  });
  socket.on("disconnecting", () => {
    socketLeaveRoom(socket);
  });

  // const users = [];
  // for (let [id, socket] of io.of("/").sockets) {
  //   users.push({
  //     userID: id,
  //     username: socket.username
  //   })
  // }
  // socket.emit('users', users);

  // socket.broadcast.emit("userConnected", {
  //   userID: socket.id,
  //   username: socket.username
  // })

});

http.listen(PORT, () => {
  console.log("Server has been started on " + PORT);
});

function socketLeaveRoom(socket) {
  for (let room of socket.rooms) {
    if (room !== socket.id) {
      socket.to(room).emit("room_user_leave", {
        userID: socket.id,
      });
      socket.leave(room);
    }
  }
}
