import React from 'react'
import { PlayerArea, DrawingArea, Logo } from '../components';
import { useParams } from 'react-router-dom'  
import NotFoundPage from './NotFoundPage';

function GamePage({onLobbyLoading, onPlayerKick}) {
  let { roomID } = useParams();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log('gamepage');
    onLobbyLoading(roomID)
  }, [roomID])

  return (
    <div>
      Game Page
      <Logo></Logo>
      <DrawingArea></DrawingArea>
      <PlayerArea onPlayerKick={onPlayerKick}></PlayerArea>
    </div>
  )
}

export default GamePage
