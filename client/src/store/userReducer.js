import { gmC } from "../helpers/constants";

const initialState = {
  userID: "",
  username: '',
  isConnected: false,
};


export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case gmC.SET_USERNAME: {
      return {
        ...state,
        username: action.payload.username
      }
    }
    case gmC.SET_USERID: {
      return {
        ...state,
        userID: action.payload.userID
      }
    }
    case gmC.SET_CONNECTION: {
      return {
        ...state,
        isConnected: action.payload.isConnected
      }
    }
    default: {
      return state;
    }
  }
};
