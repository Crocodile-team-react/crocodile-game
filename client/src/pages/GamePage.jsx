import React from 'react'
import { useParams, useHistory } from 'react-router-dom'  
import RoomNotFound from '../components/modal/RoomNotFound';
import ChooseModal from '../components/modal/ChooseModal';
import { PlayerArea, DrawingArea, Logo } from '../components';


function GamePage({onLobbyLoading, onPlayerKick,}) {
  let { roomID } = useParams();
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    console.log('gamepage');
    onLobbyLoading(roomID)
  }, [roomID])

  return (
    <div className="game-page-block">
      <Logo>
        <button className="button-short-unfilled" onClick={() => history.goBack()}>Назад</button>
        <span className="logo-small"></span>
      </Logo>
      <DrawingArea/>
      <PlayerArea onPlayerKick={onPlayerKick}/>
      {/*<RoomNotFound></RoomNotFound>*/}
      {/* <ChooseModal></ChooseModal> */}
    </div>
  )
}

export default GamePage
