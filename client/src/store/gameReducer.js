import { gmC } from "../helpers/constants";

const initialState = {
  users: [],
  messages: [],
  roomID: ''
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case gmC.SET_ROOMID: {
      return {
        ...state,
        roomID: action.payload.roomID
      }
    }
    default: {
      return state;
    }
  }
};
