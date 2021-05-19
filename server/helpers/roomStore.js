import randomId from "./random.js";
const maxRoomUsers = 2;

class RoomStore {
  createNewRoom(host, isRoomOpen) {}
  getAllOpenedRooms() {}
  joinRoom(roomID, user) {}
  leaveRoom(roomID, userID) {}
  findOpenRoom() {}
  isRoomAvailable(roomID, userID) {}
  kickUser(roomID, hostID, userID) {}
}

export class InMemoryRoomStore extends RoomStore {
  constructor() {
    super();
    this.rooms = {
      openedRoomsID: [],
      allRooms: {},
    };
    this.kickUser = this.roomDecorator(this.kickUser);
    this.isRoomAvailable = this.roomDecorator(this.isRoomAvailable);
    this.leaveRoom = this.roomDecorator(this.leaveRoom);
    this.getRoomUsers = this.roomDecorator(this.getRoomUsers);
  }
  kickUser(roomID, hostID, userID) {
    let room = this.rooms.allRooms[roomID];
    if (hostID === room.roomHostID) {
      let removedUser = this.leaveRoom(roomID, userID);
      room.blockedUsersID.push(userID);
      let response = {
        status: "success",
        message: "User was kicked from lobby",
        removedUser: removedUser,
      };
      return response;
    }
    let response = {
      status: "error",
      message: "SocketID is not equal to RoomHostID",
    };
    return response;
  }
  getRoomUsers(roomID) {
    return this.rooms.allRooms[roomID].users;
  }
  isRoomAvailable(roomID, userID) {
    if (this.rooms.allRooms[roomID].users.length >= maxRoomUsers) {
      let response = {
        status: "error",
        message: "Room is full",
      };
      return response;
    }
    if (this.rooms.allRooms[roomID].blockedUsersID.indexOf(userID) !== -1) {
      let response = {
        status: "error",
        message: "You was kicked from this lobby",
      };
      return response;
    }
    let response = {
      status: "success",
      message: "Room is exist",
    };
    return response;
  }
  leaveRoom(roomID, userID) {
    let removedUser = null;
    const newRoomUsers = this.rooms.allRooms[roomID].users.filter((user) => {
      if (user.userID !== userID) {
        return true;
      } else {
        removedUser = user;
        return false;
      }
    });
    this.rooms.allRooms[roomID].users = newRoomUsers;
    return removedUser;
  }
  joinRoom(roomID, user) {
    let response = this.isRoomAvailable(roomID, user.userID);
    if (response.status === "success") {
      this.rooms.allRooms[roomID].users.push({
        username: user.username,
        userID: user.userID,
        socketID: user.socketID,
      });
      response.hostID = this.rooms.allRooms[roomID].roomHostID;
      return response;
    }
    return response;
  }
  getAllOpenedRooms() {
    return this.rooms.openedRoomsID;
  }
  createNewRoom(host, isRoomOpen) {
    const room = {
      roomID: randomId(),
      roomHostID: host.userID,
      roomHostSocketID: host.socketID,
      users: [],
      blockedUsersID: [],
      isRoomOpen: isRoomOpen,
    };
    this.rooms.allRooms[room.roomID] = room;
    if (isRoomOpen) {
      this.rooms.openedRoomsID.push(room.roomID);
    }
    return room.roomID;
  }
  findOpenRoom() {}

  roomDecorator(func) {
    return function (roomID, ...rest) {
      if (roomID in this.rooms.allRooms) {
        return func.call(this, roomID, ...rest);
      } else {
        let response = {
          status: "error",
          message: "Room is not exist",
        };
        return response;
      }
    };
  }
}
