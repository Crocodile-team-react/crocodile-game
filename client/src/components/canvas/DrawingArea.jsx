import React from 'react'
import Canvas from './Canvas';
import SettingsBar from './SettingsBar';
import ToolBar from './ToolBar';
import WinnerModal from './WinnerModal';

function DrawingArea() {
  return (
    <div>
      Drawing area
      <Canvas></Canvas>
      <SettingsBar></SettingsBar>
      <ToolBar></ToolBar>
      <WinnerModal></WinnerModal>
    </div>
  )
}

export default DrawingArea
