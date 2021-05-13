import randomId from './random.js';

class RoomStore {
  createNewRoom(hostID, isRoomOpen) { }
  getAllOpenedRooms() { }
  findOpenRoom() {}
}

export class InMemoryRoomStore extends RoomStore {
  constructor() {
    super();
    this.rooms = {
      opened: [],
      closed: [],
    };
  }
  getAllOpenedRooms() {
    return this.rooms.opened;
  }
  createNewRoom(hostID, isRoomOpen) {
    const room = {
      roomID: randomId(),
      roomHostID: hostID,
      isRoomOpen: isRoomOpen
    };
    isRoomOpen ? this.rooms.opened.push(room) : this.rooms.closed.push(room);
    return room.roomID;
  }
  findOpenRoom() {}
}
