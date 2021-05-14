import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Avatars from "./store/avatar-ref";


const userState = {
    name: null,
    avatarIndex: 0,
    id: Math.random().toString(16).slice(4),
    typeGame: null,
};

const reduser = (state = userState, action) => {
    switch (action.type) {
        case "setName":
            return { ...state, name: action.payload };
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

const userStore = createStore(reduser);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={userStore}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
