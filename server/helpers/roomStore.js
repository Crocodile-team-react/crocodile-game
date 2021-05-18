import randomId from './random.js';
const maxRoomUsers = 2;

class RoomStore {
  createNewRoom(host, isRoomOpen) {}
  getAllOpenedRooms() {}
  joinRoom(user, roomID) {}
  leaveRoom(userID, roomID) {}
  findOpenRoom() {}
  getRoomUsers(roomID) {}
  isRoomAvailable(roomID) { }
  kickUser(roomID, userID) {}
}

export class InMemoryRoomStore extends RoomStore {
  constructor() {
    super();
    this.rooms = {
      openedRoomsID: [],
      allRooms: {},
    };
  }
  kickUser(roomID, userID) {
    
  }
  isRoomAvailable(roomID) {
    let response = {
      type: "error",
    };
    if (roomID in this.rooms.allRooms) {
      if (this.rooms.allRooms[roomID].users.length >= maxRoomUsers) {
        response.message = "Room is full";
        return response;
      }
      response.type = "success";
      response.message = "Room is exist";
      return response;
    } else {
      response.message = "Room is not exist";
      return response;
    }
  }
  getRoomUsers(roomID) {
    return this.rooms.allRooms[roomID].users;
  }
  leaveRoom(userID, roomID) {
    if (roomID in this.rooms.allRooms) {
      const newRoomUsers = this.rooms.allRooms[roomID].users.filter(
        (user) => user.userID !== userID
      );
      this.rooms.allRooms[roomID].users = newRoomUsers;
      return this.rooms.allRooms[roomID].roomHostID;
    }
    return false;
  }
  joinRoom(user, roomID) {
    let response = {
      status: "error",
    };
    if (roomID in this.rooms.allRooms) {
      if (this.rooms.allRooms[roomID].users.length >= maxRoomUsers) {
        response.message = "Room is full";
        return response;
      } else {
        this.rooms.allRooms[roomID].users.push({
          username: user.username,
          userID: user.userID,
          socketID: user.socketID,
        });
        response.hostID = this.rooms.allRooms[roomID].roomHostID;
        response.status = "success";
        return response;
      }
    }
    response.message = "Room is not exist";
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
      isRoomOpen: isRoomOpen,
    };
    this.rooms.allRooms[room.roomID] = room;
    if (isRoomOpen) {
      this.rooms.openedRoomsID.push(room.roomID);
    }
    return room.roomID;
  }
  findOpenRoom() {}
}
