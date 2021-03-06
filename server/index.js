import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { InMemorySessionStore } from './helpers/sessionStore.js';
import { InMemoryRoomStore } from "./helpers/roomStore.js";
import randomId from './helpers/random.js';
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

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

  io.emit("newPlayer", { totalPlayers: io.engine.clientsCount });

  socket.on("draw", (figure) => {
    let room = roomStore.getRoom(socket.roomID);
    broadcastToUsers(room.users, "draw", figure);
  })

  socket.on("user:infoChange", data => {
    switch (data.type) {
      case "username": {
        socket.username = data.value;
        break;
      }
      case "avatarID": {
        socket.avatarID = data.value;
        break;
      }
    }
  });

  socket.on("room:getInfo", callback => {
    callback(roomStore);
  });

  socket.on("image:save", (img) => {
    saveImage(img, socket);
  });
  socket.on("image:change", (img) => {
    saveImage(img, socket);
    let room = roomStore.getRoom(socket.roomID);
    let users = room.users;
    broadcastToUsers(users, "image:change", img);
  })
  socket.on("image:get", (callback) => {
    try {
      const file = fs.readFileSync(
        path.resolve(__dirname, "files", `${socket.roomID}.jpg`)
      );
      const data = "data:image/png;base64," + file.toString("base64");
      callback({data});
    } catch (e) {
      console.log(e);
    }
  })

  socket.on("game:start", () => {
    let room = roomStore.getRoom(socket.roomID);
    let users = room.users;
    room.isGameStarted = true;
    roomStore.changeLeader(room.roomID);
    broadcastToUsers(users, "game:start", { users, leaderID: room.roomLeaderID });
  });
  socket.on("game:findGame", (callback) => {
    let timerCounter = 0;
    let timer = setInterval(() => {
      timerCounter++;
      let url = roomStore.findOpenRoom();
      if (url !== null) {
        clearInterval(timer);
        callback(url);
      }
      if (timerCounter >= 10) {
        clearInterval(timer);
        callback(null);
      }
    }, 1000)
  })
  socket.on("game:private", (isPrivate) => {
    roomStore.setRoomStatus(socket.roomID, isPrivate);
  })
  socket.on("game:wordChoose", (word) => {
    let roomID = socket.roomID;
    let room = roomStore.getRoom(roomID);
    let users = roomStore.getRoomUsers(roomID);
    room.roomWord = word;
    room.gameCounter = 180; // round counter
    room.isRoundStarted = true;

    let letters = new Array(room.roomWord.length).fill("");

    broadcastToUsers(users, "game:startNewRound");

    try {
      fs.unlinkSync(path.resolve(__dirname, "files", `${socket.roomID}.jpg`));
      //file removed
    } catch (err) {
      console.error(err);
    }

    room.timer = setInterval(() => {
      room.gameCounter = room.gameCounter - 1;
      if (room.gameCounter === 150) {
        broadcastToUsers(users, "game:newLetter", letters);
      }
      if (room.gameCounter === 120) {
        letters[0] = room.roomWord[0];
        broadcastToUsers(users, "game:newLetter", letters);
      }
      if (room.gameCounter === 90) {
        letters[letters.length - 1] = room.roomWord[room.roomWord.length - 1];
        broadcastToUsers(users, "game:newLetter", letters);
      }
      if (room.gameCounter === 0) {
        roomEndRound(room.roomID);
      }
    }, 1000);

  });

  socket.on("game:checkWord", (msg) => {
    let roomID = socket.roomID;
    let room = roomStore.getRoom(roomID);
    let users = room.users;
    room.messages.push(msg);

    broadcastToUsers(users, "game:newMessage", msg);

    if (room.roomWord === msg.text) {
      
      let userID = socket.userID;
      let leaderID = room.roomLeaderID;
      let leader = users.find(user => user.userID === leaderID);
      let user = users.find(user => user.userID === userID);
      if (leader) {
        leader.pointCount += +15;
      }
      if (user) {
        user.pointCount += +10;
      }
      
      roomEndRound(room.roomID, socket.username);
    }
  });

  socket.on("room:kickPlayer", userID => {
    let roomID = socket.roomID;
    let hostID = socket.userID;
    let response = roomStore.kickUser(roomID, hostID, userID);
    if (response.status === "success") {
      io.to(response.removedUser.socketID).emit("room:kicked");
      let users = roomStore.getRoomUsers(socket.roomID);
      broadcastToUsers(users, "room:userLeave", users);
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

  socket.on("room:join", ({roomID}, callback) => {
    let newUser = {
      userID: socket.userID,
      username: socket.username,
      socketID: socket.id,
      avatarID: socket.avatarID,
      pointCount: 0,
    };
    let response = roomStore.joinRoom(roomID, newUser);
    if (response.status === "success") {
      let room = roomStore.getRoom(roomID);
      let users = room.users;
      socket.roomID = room.roomID;
      broadcastToUsers(users, "room:userJoin", users);
      callback({
        response,
        users: room.users,
        isGameStarted: room.isGameStarted,
        isRoundStarted: room.isRoundStarted,
        gameCounter: room.gameCounter,
        messages: room.messages,
        leaderID: room.roomLeaderID,
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
    let roomID = socket.roomID;
    let room = roomStore.getRoom(roomID);
    let removedUser = roomStore.leaveRoom(roomID, socket.userID);
    if (removedUser) {
      setTimeout(() => {
        if (room.users) {
          if (!room.users.find((user) => user.userID === socket.userID)) {
            let users = room.users;
            if (users.length) {
              if (room.roomLeaderID === removedUser.userID) {
                roomEndRound(room.roomID);
              }
                broadcastToUsers(users, "room:userLeave", users);
            } else {
              roomStore.removeRoom(roomID);
            }
          }
        } else {
          roomStore.removeRoom(roomID);
        }
      }, 1500)
      
    }
  }
}

const broadcastToUsers = (users, event, data = null) => {
  if (users) {
    users.forEach((user) => {
      io.to(user.socketID).emit(event, data);
    });
  }
};

const roomEndRound = (roomID, winner = null) => {
  let room = roomStore.getRoom(roomID);
  let users = room.users;

  room.isRoundStarted = false;
  roomStore.changeLeader(roomID);
  clearInterval(room.timer);

  broadcastToUsers(users, "game:endRound", {
    users: room.users,
    leaderID: room.roomLeaderID,
    word: room.roomWord,
    winner,
  });

}

const saveImage = (img, socket) => {
  try {
    const data = img.img.replace("data:image/png;base64,", "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", `${socket.roomID}.jpg`),
      data,
      "base64"
    );
  } catch (e) {
    console.log(e);
  }
}