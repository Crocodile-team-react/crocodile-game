import { gmC } from "../helpers/constants";

const initialState = {
  users: [],
  messages: [],
  roomID: "",
  roomHostID: "",
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case gmC.SET_ROOMID: {
      return {
        ...state,
        roomID: action.payload.roomID
      }
    }
    case gmC.SET_USERS: {
      return {
        ...state,
        users: action.payload.users,
      }
    }
    case gmC.ADD_USER: {
      const newUsers = [...state.users];
      newUsers.push(action.payload.user);
      return {
        ...state,
        users: newUsers,
      };
    }
    case gmC.REMOVE_USER: {
      const newUsers = state.users.filter(user => user.userID
        !== action.payload.userID);
      return {
        ...state,
        users: newUsers
      }
    }
    case gmC.SET_ROOM_HOSTID: {
      return {
        ...state,
        roomHostID: action.payload.roomHostID
      }
    }
    default: {
      return state;
    }
  }
};
