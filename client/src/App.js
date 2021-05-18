import "./styles/main.scss";
import React from "react";
import { StartPage, GamePage, NotFoundPage } from "./pages";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PlayerArea from "./components/game/PlayerArea.jsx";
import "./styles/stylesLibrary/main-styles.scss";

function App() {
    const generateGameLobbyId = () => {
        return (Math.random() * 1e17).toString();
    };
    return (
        <Router>
            <div className="background">
                <PlayerArea />
            </div>
        </Router>
    );
}

export default App;
