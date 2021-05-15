
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduser from './store/userReducer'

const userStore = createStore(reduser);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={userStore}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
document.getElementById("root"));
