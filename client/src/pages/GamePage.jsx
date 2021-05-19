import React from 'react';
import RoomNotFound from '../components/modal/RoomNotFound';
import ChooseModal from '../components/modal/ChooseModal';
import { PlayerArea, DrawingArea, Logo, Modal } from '../components';

function GamePage() {
  return (
    <div className="game-page-block">
      <Logo>
        <button className="button-short-unfilled" onClick={f=>f}>Назад</button>
        <span className="logo-small"></span>
      </Logo>
      <DrawingArea/>
      <PlayerArea/>
      {/*<RoomNotFound></RoomNotFound>*/}
      {/* <ChooseModal></ChooseModal> */}
    </div>
  );
}

export default GamePage;
