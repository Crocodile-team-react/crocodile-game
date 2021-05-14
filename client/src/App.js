import './styles/main.scss';
import React from 'react';
import { StartPage, GamePage, NotFoundPage } from './pages';
import { useHistory, Switch, Route, Link } from 'react-router-dom';
import { useGameData } from './helpers/useGameData';
import { useDispatch, useSelector } from "react-redux";

function App() {
  const socket = useGameData();
  const dispatch = useDispatch();
  const roomID = useSelector(state => state.game.roomID);
  let history = useHistory();

  React.useEffect(() => {
    if (roomID) {
      history.push("/game/" + roomID);
    }
  }, [roomID])
  React.useEffect(() => {
    if (socket.isConnected) {
      const username = socket.getUserName();
      const userID = socket.getUserID();
      dispatch({
        type: "SET_USERNAME",
        payload: {
          username,
        },
      });
      dispatch({
        type: "SET_USERID",
        payload: {
          userID,
        },
      });
    }
  }, [socket.isConnected]);

  const handleFindGameClick = (username) => {
    socket.getConnection(username);
  };
  const handleNewGameClick = () => {
    socket.socket.emit("room:host", (url) => {
      dispatch({
        type: "SET_ROOMID",
        payload: {
          roomID: url
        }
      });
    });
  }
  const handleLobbyLoading = (roomID) => {
    socket.socket.emit("room:join", { roomID }, (response) => {
      console.log(response);
    });
  }
  return (
    <div className="app">
      <ul>
        <li><Link to="/">Start page</Link></li>
        <li><Link to={"/game/" + (Math.random() * 1e17).toString()}>Game page</Link></li>
        <li><Link to="/whatTheHeck">Not Found page</Link></li>
      </ul>
      <Switch>
        <Route path="/" exact>
          <StartPage
            onNewGameClick={handleNewGameClick}
            onFindGameClick={handleFindGameClick} />
        </Route>
        <Route path="/game/:roomID" exact>
          <GamePage
            onLobbyLoading={handleLobbyLoading} />
        </Route>
        <Route path="/">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
