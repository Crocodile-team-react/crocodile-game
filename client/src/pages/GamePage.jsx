import React from 'react';
import { PlayerArea, DrawingArea, Logo } from '../components';

function GamePage() {
  return (
    <div className="game-page-block">
      <Logo>
        <span className="logo-small"></span>
      </Logo>
      <DrawingArea></DrawingArea>
      <PlayerArea></PlayerArea>
    </div>
  );
}

export default GamePage;
