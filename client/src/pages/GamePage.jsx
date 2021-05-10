import React from 'react'
import { PlayerArea, DrawingArea, Logo } from '../components';

function GamePage() {
  return (
    <div>
      Game Page
      <Logo></Logo>
      <DrawingArea></DrawingArea>
      <PlayerArea></PlayerArea>
    </div>
  )
}

export default GamePage
