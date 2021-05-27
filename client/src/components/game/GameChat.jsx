import React from 'react';
import Message from './Message';
import AnswerField from './AnswerField';
import { useSelector } from 'react-redux';

function GameChat({ onMessageSend }) {
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
  return (
    <div className="game-chat-block">
      <div className="box">
        <ul className="game-chat-block__messages">
          <Message>Сейчас рисует <b>Player 1</b></Message>
        </ul>
      </div>
      {
        !isUserLeader &&
        <AnswerField onMessageSend={onMessageSend}/>
      }
    </div>
  );
}

export default GameChat;
