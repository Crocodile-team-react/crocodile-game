import './styles/main.scss';
import React from 'react';
import { StartPage, GamePage, NotFoundPage } from './pages';
import { useHistory, Switch, Route, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers, setRoomID,
  addUser, removeUser,
  setRoomHostID, setGameStarted,
} from "./store/actions/gameActions";
import { setUsername, setUserID, setConnection, setAvatar } from "./store/actions/userActions";
import { io } from 'socket.io-client';
import { useLocalStorage, c, errMsg } from './helpers';
import { WarningModal } from './components';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const roomID = useSelector((state) => state.game.roomID);
  const timer = useSelector(state => ({ timer: state.game.gameTimer, counter: state.game.counter}))
  const [sessionID, setSessionID] = useLocalStorage("sessionID");
  const history = useHistory();
  const location = useLocation();
  const socket = React.useRef(io(c.SERVER_URL, { autoConnect: false }));
  const [modalData, setModalData] = React.useState({ isSeen: false, title: "", body: "" });
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
    socket.current.on("game:start", (users) => {
      dispatch(setUsers(users));
      dispatch(setGameStarted(true));
    });
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
  const handleWordChoose = (word) => {
    socket.current.emit("game:wordChoose", word);
  }
  const socketGetConnection = (initialConnection = false, timeout = 10000) => {
    return new Promise((resolve, reject) => {
      if ((initialConnection && sessionID) || user.username) {
        if (socket.current.connected) {
          resolve(true);
          return;
        }
        let timer;
        socket.current.auth = {
          avatarID: user.avatarID,
          username: user.username,
          sessionID,
        };

        socket.current.connect();

        function responseHandler(body) {
          const username = body.username;
          const userID = body.userID;
          const avatarID = body.avatarID;
          socket.current.auth = { sessionID: body.sessionID };
          socket.current.userID = body.userID;
          setSessionID(body.sessionID);
          dispatch(setUsername(username));
          dispatch(setUserID(userID));
          dispatch(setAvatar(avatarID));
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
        reject(errMsg.voidUsername);
      }
    });
  };
  const handleFindGameClick = () => {
    if (!user.isConnected) {
      socketGetConnection();
    } else {
      
    }
  };
  const handleStartGameClick = () => {
    socket.current.emit("game:start");
  }
  const handleJoinByCode = (code) => {
    history.push("/game/" + code);
  }
  const handleNewGameClick = () => {
    socketGetConnection()
      .then(() => {
        socket.current.emit("room:host", (url) => {
          history.push("/game/" + url);
        });
      })
      .catch((msg) => {
        if (msg === errMsg.voidUsername) {
          setModalData({
            isSeen: true,
            title: "Ошибка",
            body: msg,
          }); // here we can show modal
        }
      });
  };
  const handleLobbyLoading = (roomID, setLoading, setRoomFound, setErrorMessage) => {
    socketGetConnection(true, 2000)
      .then((connected) => {
        socket.current.emit("room:join", { roomID }, ({ response, users }) => {
          setTimeout(() => { // loading imitation
            setLoading(false);
            if (response.status === "error") {
              setRoomFound(false);
              setErrorMessage(response.message);
            }
            if (response.status === "success") {
              setRoomFound(true);
              dispatch(setRoomHostID(response.hostID));
              dispatch(setRoomID(roomID));
              dispatch(setUsers(users));
            }
          }, 200);
        });
      })
      .catch((msg) => {
        setLoading(false);
        if (msg.message === errMsg.voidUsername) {
          setRoomFound(false);
          setErrorMessage({
            title: "Ошибка",
            body: msg.message,
          }); // here we can show modal
        } else {
          setRoomFound(false);
          setErrorMessage({
            title: "Ошибка",
            body: "Сессия не найдена или имя пользователя не указано",
          }); 
        }
      });
  };
  const closeModal = () => {
    setModalData({
      ...modalData,
      isSeen: false,
    })
  }
  return (
    <div className="app">
      {modalData.isSeen ? (
        <WarningModal title={modalData.title} body={modalData.body}>
          <button onClick={closeModal} className="button-medium-filled">
            Ладно
          </button>
        </WarningModal>
      ) : (
        ""
      )}
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
            onWordChoose={handleWordChoose}
            onStartGameClick={handleStartGameClick}
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
