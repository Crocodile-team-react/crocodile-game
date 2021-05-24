import { gmC } from '../../helpers/constants.js';


export const setUsers = (users) => {
  return {
    type: gmC.SET_USERS,
    payload: {
      users
    }
  };
}
export const setRoomID = (roomID) => {
  return {
    type: gmC.SET_ROOMID,
    payload: {
      roomID
    }
  }
}
export const addUser = (user) => {
  return {
    type: gmC.ADD_USER,
    payload: {
      user
    }
  }
}
export const removeUser = (userID) => {
  return {
    type: gmC.REMOVE_USER,
    payload: {
      userID
    }
  }
}
export const setRoomHostID = (roomHostID) => {
  return {
    type: gmC.SET_ROOM_HOSTID,
    payload: {
      roomHostID
    }
  }
}
export const setGameStarted = (isGameStarted) => {
  return {
    type: gmC.SET_GAME_STARTED,
    payload: {
      isGameStarted,
    },
  };
};