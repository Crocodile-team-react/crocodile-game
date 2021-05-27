import React from 'react';
import Modal from './Modal';

function WinnerModal(props) {
    const word = 'Крокодил';
    const player = 'Player 2';
    const score = 120; 
  return (
    <Modal w="280" className="winner-modal-block">
      <h3 className="title">{word}</h3>
      true?
      <p className="win-text">угадал(а): {player}</p>:
      <p className="win-text">никто не угадал</p>
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
      <form className="form-with-inp-but">
            <button className="button-long-filled copy" type="submit">скачать картинку</button>
        </form>
    </Modal>
  );
}

export default WinnerModal;
