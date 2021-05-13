import { useEffect, useState, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { c } from './constants';
import io from 'socket.io-client'

const SERVER_URL = 'http://localhost:5000'

export const useGameData = () => {
  const [userID, setUserID] = useLocalStorage("userID");
  const [sessionID, setSessionID] = useLocalStorage('sessionID'); //sessionID
  const [roomID, setRoomID] = useState(null);
  const [username, setUsername] = useState('');
  const [isConnected, setConnected] = useState(false);

  let socket = useRef(null);

  useEffect(() => {
    socket.current = io(SERVER_URL, {
      autoConnect: false,
    });
    if (sessionID) {
      console.log(sessionID);
      socket.current.auth = {
        sessionID
      }
      socket.current.connect();
    }
    socket.current.onAny((msg, body) => {
      console.log(msg, body);
    });

    socket.current.on("session", (body) => {
      setSessionID(body.sessionID);
      setUsername(body.username);
      setUserID(body.userID);
      socket.current.auth = { sessionID: body.sessionID };
      socket.current.userID = body.userID;
      setConnected(true);
    });
    socket.current.on("room:host", room => {
      setRoomID(room.roomID);
    })
    socket.current.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.error("Please enter the name");
      }
      setConnected(false);
    });
    
    return () => {
      socket.current.disconnect();
    };

  }, []);

  const createNewRoom = () => {
    socket.current.emit("room:host");
  }
  const sendMessage = () => {
    console.log("sending");
  }
  const getUserName = () => {
    return username
  }
  const getConnection = (username) => {
    if (username) {
      socket.current.auth = {
        username
      };
      socket.current.connect();
    }
  }
  const getUserID = () => {
    return userID;
  }
  const removeMessage = () => {
    console.log("removing")
  }

  return {
    socket: socket.current,
    roomID,
    isConnected,
    getConnection,
    sendMessage,
    getUserName,
    createNewRoom,
    getUserID,
  };
}