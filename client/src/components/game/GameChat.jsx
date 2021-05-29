import React from 'react';
import Message from './Message';
import AnswerField from './AnswerField';
import { useSelector, useDispatch } from 'react-redux';

function GameChat({ socket }) {
  // make dispatch object
  // get state messages;
  let userID = useSelector(state => state.user.userID);
  let isUserLeader = useSelector(state => {
    for (let i = 0; i < state.game.users.length; i++) {
      if (state.game.users[i].leader) {
        if (state.game.users[i].userID === userID) {
          return true;
        }
        return false;
      }
    }
  })

  const handleSendMessage = (msg) => {
    // check empty message
    socket.emit("game:checkWord", msg);
  };

  React.useEffect(() => {

    socket.on('game:newMessage', () => {
      // dispatch addNewMessage 
    }); // on new message
    return () => {
      socket.removeListener('message');
    }
  }, [])

  return (
    <div className="game-chat-block">
      <div className="box">
        <ul className="game-chat-block__messages">
          <Message>Сейчас рисует <b>Player 1</b></Message>
          <Message from="player">Сейчас рисует</Message>
          <Message from="player">Сейчас рисует</Message>
        </ul>
      </div>
      {
        !isUserLeader &&
        <AnswerField onMessageSend={handleSendMessage}/>
      }
    </div>
  );
}

export default GameChat;
