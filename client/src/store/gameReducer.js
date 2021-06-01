import { gmC } from "../helpers/constants";

const initialState = {
  users: [],
  messages: [],
  roomID: "",
  roomHostID: "",
  isGameStarted: false,
  isRoundStarted: false,
  gameModal: { isSeen: false, winner: null, word: "" },
  counter: 500,
  letters: [],
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case gmC.COUNTER_TICK: {
      let counter = state.counter - 1;
      return {
        ...state,
        counter: counter,
      };
    }
    case gmC.SET_GAME_COUNTER: {
      return {
        ...state,
        counter: action.payload.counter,
      };
    }
    case gmC.DISCARD_GAME_DATA: {
      return {
        ...state,
        gameModal: { isSeen: false, winner: null, word: "" },
        letters: [],
      };
    }
    case gmC.SET_GAME_MODAL: {
      return {
        ...state,
        gameModal: {
          ...action.payload,
        },
      };
    }
    case gmC.SET_LETTERS: {
      return {
        ...state,
        letters: action.payload.letters,
      };
    }
    case gmC.SET_ROUND_STARTED: {
      return {
        ...state,
        isRoundStarted: action.payload.isRoundStarted,
      };
    }
    case gmC.SET_ROOMID: {
      return {
        ...state,
        roomID: action.payload.roomID,
      };
    }
    case gmC.SET_GAME_STARTED: {
      return {
        ...state,
        isGameStarted: action.payload.isGameStarted,
      };
    }
    case gmC.SET_USERS: {
      return {
        ...state,
        users: action.payload.users,
      };
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
      const newUsers = state.users.filter(
        (user) => user.userID !== action.payload.userID
      );
      return {
        ...state,
        users: newUsers,
      };
    }
    case gmC.SET_ROOM_HOSTID: {
      return {
        ...state,
        roomHostID: action.payload.roomHostID,
      };
    }
    case gmC.SET_NEW_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    }
    default: {
      return state;
    }
  }
};
