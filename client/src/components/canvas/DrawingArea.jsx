import React from 'react';
import Canvas from './Canvas';
import SettingsBar from './SettingsBar';
import ToolBar from './drawingArea/ToolBar';
import Avatar from '../Avatar';
import Letters from './drawingArea/Letters';
import Timer from './drawingArea/Timer';
import ColorsBar from './drawingArea/ColorsBar';
import WinnerModal from '../modal/WinnerModal';

function DrawingArea() {
  return (
    <div className="drawing-area-block">
      <Canvas>
        <Avatar avatar="avatar-crocodile" userName="Player 1"/>
        <Letters/>
        <Timer minutes="2" seconds="58"/>
        <ColorsBar/>
      </Canvas>
      <ToolBar/>
      <WinnerModal></WinnerModal>
    </div>
  );
}

export default DrawingArea;
