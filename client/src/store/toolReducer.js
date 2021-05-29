import { gmC } from "../helpers/constants";

const initialState = {
  tool: null,
};

export const toolReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COLOR": { // create constant and action 
      let newTool = Object.assign({}, state.tool);
      newTool.strokeStyle = action.payload.color;
      return {
        tool: newTool,
      }
    }
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
