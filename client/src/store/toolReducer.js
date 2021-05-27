import { gmC } from "../helpers/constants";

const initialState = {
  tool: null,
};

export const toolReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOOL": {
      return {
        tool: action.payload.tool,
      }
    }
    default: {
      return state;
    }
  }
};
