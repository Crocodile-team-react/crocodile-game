import { gmC } from "../../helpers/constants.js";

export const setUsername = (username) => {
  return {
    type: gmC.SET_USERNAME,
    payload: {
      username,
    },
  };
};

export const setUserID = (userID) => {
  return {
    type: gmC.SET_USERID,
    payload: {
      userID,
    },
  };
};

export const setConnection = (isConnected) => {
  return {
    type: gmC.SET_CONNECTION,
    payload: {
      isConnected
    }
  }
}

export const setIsAdmin = (isAdmin) => {
    return {
      type: gmC.SET_IS_ADMIN,
      payload: {
        isAdmin
      }
    }
  }


