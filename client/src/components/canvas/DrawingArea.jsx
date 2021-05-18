import React from 'react'
import Canvas from './Canvas';
import SettingsBar from './SettingsBar';
import ToolBar from './ToolBar';
import WinnerModal from './WinnerModal';
import Avatar from '../Avatar';
import Letters from './drawingArea/Letters';
import Timer from './drawingArea/Timer';
import ColorsBar from './drawingArea/ColorsBar';

function DrawingArea() {
  return (
    <div className="drawing-area-block">
      <Canvas>
        <Avatar userName="Player 1"></Avatar>
        <Letters></Letters>
        <Timer minutes="2" seconds="58"></Timer>
        <ColorsBar></ColorsBar>
      </Canvas>
      <SettingsBar></SettingsBar>
      <ToolBar></ToolBar>
      <WinnerModal></WinnerModal>
    </div>
  )
}

export default DrawingArea
