import { gmC } from "../helpers/constants";
import Avatars from "./avatar-ref";

const userState = {
    username: null,
    avatarIndex: 0,
    id: Math.random().toString(16).slice(4),
    typeGame: null,
};


const reduser = (state = userState, action) => {
    switch (action.type) {
        case "setName":
            return { ...state, username: action.payload };
        case "setId":
            return { ...state, id: action.payload };
        case "+AvatarIndex":
            return {
                ...state,
                avatarIndex:
                    state.avatarIndex >= Avatars.length - 1
                        ? 0
                        : state.avatarIndex + action.payload,
            };
        case "-AvatarIndex":
            return {
                ...state,
                avatarIndex:
                    state.avatarIndex <= 0
                        ? Avatars.length - 1
                        : state.avatarIndex - action.payload,
            };
        case "setTypeGame":
            return { ...state, typeGame: action.payload };
        default:
            return state;
    }
};

export default reduser;

