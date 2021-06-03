import { gmC } from "../helpers/constants";

const initialState = {
  tool: null,
  color: "#000",
  lineWidth: 2,
};

export const toolReducer = (state = initialState, action) => {
  switch (action.type) {
    case gmC.SET_LINE_WIDTH: {
      let tool = state.tool;
      if (tool !== null) {
        tool.lineWidth = action.payload.lineWidth;
      }
      return {
        ...state,
        tool: tool,
        lineWidth: action.payload.lineWidth
      }
    }
    case gmC.SET_COLOR: {
      let tool = state.tool;
      if (tool !== null) {
        tool.strokeStyle = action.payload.color;
      }
      return {
        ...state,
        tool: tool,
        color: action.payload.color,
      };
    }
    case gmC.SET_TOOL: {
      let tool = action.payload.tool;
      if (tool !== null) {
        tool.strokeStyle = state.color;
        tool.lineWidth = state.lineWidth;
      }
      
      return {
        ...state,
        tool,
      }
    }
    default: {
      return state;
    }
  }
};
