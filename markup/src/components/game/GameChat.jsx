import React from 'react';
import Message from './Message';
import AnswerField from './AnswerField';

function GameChat() {
  return (
    <div className="game-chat-block">
      <div className="box">
        <ul className="game-chat-block__messages">
          <Message>Сейчас рисует <b>Player 1</b></Message>
          <Message from="Player 3">чемодан</Message>
          <Message from="Player 3">конфета</Message>
          <Message from="Player 2">догадка 1</Message>
          <Message from="Player 2">догадка 2</Message>
          <Message from="Player 2">догадка 3</Message>
          <Message from="Player 4">конфета</Message>
          <Message from="Player 5">догадка</Message>
          <Message from="Player 2">догадка</Message>
        </ul>
      </div>
      <AnswerField />
    </div>
  );
}

export default GameChat;