import randomId from './random.js';

class RoomStore {
  createNewRoom(host, isRoomOpen) {}
  getAllOpenedRooms() {}
  joinRoom(user, roomID) {}
  leaveRoom(userID, roomID) {}
  findOpenRoom() {}
  getRoomUsers(roomID) {}
}

export class InMemoryRoomStore extends RoomStore {
  constructor() {
    super();
    this.rooms = {
      openedRoomsID: [],
      allRooms: {},
    };
  }
  getRoomUsers(roomID) {
    return this.rooms.allRooms[roomID].users;
  }
  leaveRoom(userID, roomID) {
    if (roomID in this.rooms.allRooms) {
      const newRoomUsers = this.rooms.allRooms[roomID].users.filter(
        user => user.userID !== userID
      )
      this.rooms.allRooms[roomID].users = newRoomUsers;
      return true;
    }
    return false;
  }
  joinRoom(user, roomID) {
    if (roomID in this.rooms.allRooms) {
      this.rooms.allRooms[roomID].users.push({
        username: user.username,
        userID: user.userID,
      });
      return this.rooms.allRooms[roomID].roomHostID;
    }
    return false;
  }
  getAllOpenedRooms() {
    return this.rooms.openedRoomsID;
  }
  createNewRoom(host, isRoomOpen) {
    const room = {
      roomID: randomId(),
      roomHostID: host.userID,
      users: [],
      isRoomOpen: isRoomOpen
    };
    this.rooms.allRooms[room.roomID] = room;
    if (isRoomOpen) {
      this.rooms.openedRoomsID.push(room.roomID);
    }
    return room.roomID;
  }
  findOpenRoom() {}
}
