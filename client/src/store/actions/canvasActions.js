import { gmC } from "../../helpers/constants.js";

export const setCanvas = (canvas) => {
  return {
    type: gmC.SET_CANVAS,
    payload: {
      canvas,
    },
  };
};
