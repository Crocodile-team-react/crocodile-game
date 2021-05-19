import React from 'react';
import Modal from './Modal';

function WinnerModal(props) {
    const word = 'Крокодил';
    const player = 'Player 2';
    const score = 120; 
  return (
    <Modal w="280" className="winner-modal-block">
      <h3 className="title">{word}</h3>
      <p className="win-text">угадал(а): {player}</p>
      {/*Game results*/}
      <div className="game-results-block">
        <h3 className="title">Конец игры</h3>
        <ol className="users-score">
            <li>
                <span className="player">Player 1</span>
                <span className="score">({score}<span className="coin"></span>)</span>
            </li>
            <li>
                <span className="player">Player 2</span>
                <span className="score">({score}<span className="coin"></span>)</span>
            </li>
            <li>
                <span className="player">Player 3</span>
                <span className="score">({score}<span className="coin"></span>)</span>
            </li>
        </ol>
      </div>
      <p className="text">Поделиться картинкой</p>
      <form className="form-with-inp-but">
            <input type="text" className="input" placeholder="Ссылка на изображение"/>
            <button className="button-short-filled copy" type="submit"></button>
        </form>
    </Modal>
  );
}

export default WinnerModal;
