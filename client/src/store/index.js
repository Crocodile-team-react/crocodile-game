import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer } from "./userReducer";
import { gameReducer } from "./gameReducer";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
