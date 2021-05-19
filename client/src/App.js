import './styles/main.scss';
import React from 'react';
import { StartPage, GamePage, NotFoundPage } from './pages';
import { useHistory, Switch, Route, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setRoomID, addUser, removeUser, setRoomHostID } from "./store/actions/gameActions";
import { setUsername, setUserID, setConnection } from "./store/actions/userActions";
import { io } from 'socket.io-client';
import { useLocalStorage, c, errMsg } from './helpers';

function App() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const roomID = useSelector((state) => state.game.roomID);
  const isConnected = useSelector((state) => state.user.isConnected);
  const [sessionID, setSessionID] = useLocalStorage("sessionID");
  const history = useHistory();
  const location = useLocation();
  const socket = React.useRef(io(c.SERVER_URL, { autoConnect: false }));

  React.useEffect(() => {
    socket.current.onAny((msg, body) => {
      console.log(msg, body);
    });
    socket.current.on("room:userJoin", (user) => {
      dispatch(addUser(user));
    });
    socket.current.on("room:userLeave", (userID) => {
      console.log("user left" + userID); // additional opportunity to handle
      dispatch(removeUser(userID));
    })
    socket.current.on("room:userKicked", (userID) => { //someone else was kicked
      console.log("user was kicked " + userID); // additional opportunity to handle
      dispatch(removeUser(userID));
    })
    socket.current.on("room:kicked", () => { // you was kicked
      console.log("you was kicked from lobby");
      dispatch(setRoomID(""));
      dispatch(setUsers([]));
      history.push("/");
    })
    return () => {
      socket.current.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!location.pathname.match(/\/game\/\w+/g) && roomID) {
      handleRoomLeave();
    }
  }, [location.pathname]);

  const handleRoomLeave = () => {
    socket.current.emit("room:leave");
   };
  const handlePlayerKick = (userID) => {
    socket.current.emit("room:kickPlayer", userID);
  };
  const socketGetConnection = (initialConnection = false, timeout = 10000) => {
    return new Promise((resolve, reject) => {
      if ((initialConnection && sessionID) || username) {
        if (socket.current.connected) {
          resolve(true);
          return;
        }
        let timer;
        socket.current.auth = {
          username,
          sessionID,
        };

        socket.current.connect();

        function responseHandler(body) {
          const username = body.username;
          const userID = body.userID;
          socket.current.auth = { sessionID: body.sessionID };
          socket.current.userID = body.userID;
          setSessionID(body.sessionID);
          dispatch(setUsername(username));
          dispatch(setUserID(userID));
          dispatch(setConnection(true));
          clearTimeout(timer);
          resolve(true);
        }
        function errorHandler(error) {
          clearTimeout(timer);
          reject(error);
        }

        socket.current.on("connect_error", errorHandler);
        socket.current.on("session", responseHandler);

        timer = setTimeout(() => {
          reject(new Error("timeout expired"));
          socket.current.removeListener("session", responseHandler);
          socket.current.removeListener("session", errorHandler);
        }, timeout);
      } else {
        reject(errMsg.sessionNotFound);
      }
    });
  };
  const handleFindGameClick = () => {
    if (!isConnected) {
      socketGetConnection();
    } else {
      
    }
  };
  const handleJoinByCode = (code) => {
    history.push("/game/" + code);
  }
  const handleNewGameClick = () => {
    socketGetConnection().then(() => {
      socket.current.emit("room:host", (url) => {
        history.push("/game/" + url);
      });
    })
  };
  const handleLobbyLoading = (roomID) => {
    socketGetConnection(true, 2000)
      .then((connected) => {
        socket.current.emit("room:join", { roomID }, ({ response, users }) => {
          if (response.status === "error") {
            history.push("/"); // if room not exist or any error redirect to main (/) 
            console.error(response.message); // here we can handle error when room is not exist for example
          }
          if (response.status === "success") {
            dispatch(setRoomHostID(response.hostID));
            dispatch(setRoomID(roomID));
            dispatch(setUsers(users));
          }
        });
      })
      .catch((msg) => {
        if (msg === errMsg.sessionNotFound) {
          history.push("/");
          console.log("Player need input username before connection"); // here we can show modal
        }
      });
  };
  const getRoomsInfo = () => {
    socket.current.emit("room:getInfo", (response) => {
      console.log(response);
    })
  }
  return (
    <div className="app">
      <ul>
        <li>
          <Link to="/">Start page</Link>
        </li>
        <li>
          <Link to={"/game/" + (Math.random() * 1e17).toString()}>
            Game page
          </Link>
        </li>
        <li>
          <Link to="/whatTheHeck">Not Found page</Link>
        </li>
        <button onClick={getRoomsInfo}>get rooms info</button>
      </ul>
      <Switch>
        <Route path="/" exact>
          <StartPage
            socketGetConnection={socketGetConnection}
            onNewGameClick={handleNewGameClick}
            onFindGameClick={handleFindGameClick}
            onJoibByCodeClick={handleJoinByCode}
          />
        </Route>
        <Route path="/game/:roomID" exact>
          <GamePage
            onPlayerKick={handlePlayerKick}
            onLobbyLoading={handleLobbyLoading}
          />
        </Route>
        <Route path="/">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
