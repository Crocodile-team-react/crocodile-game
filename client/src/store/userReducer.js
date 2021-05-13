import { gmC } from "../helpers/constants";

const initialState = {
  userID: "",
  username: ''
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
    default: {
      return state;
    }
  }
};
