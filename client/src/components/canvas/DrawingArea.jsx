import React from 'react';
import { Canvas, ToolBar, Avatar, Letters, Timer, ColorsBar, ChooseModal, WinnerModal } from '../index.js';
import { useSelector, useDispatch } from 'react-redux';
import { discardGameData } from '../../store/actions/gameActions';

function DrawingArea({ onWordChoose, socket}) {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.user.userID);
  const leader = useSelector(state => state.game.users.find(user => {
    return user.leader;
  }));
  const isGameStarted = useSelector(state => state.game.isGameStarted);
  const isRoundStarted = useSelector(state => state.game.isRoundStarted);
  const modalData = useSelector(state => state.game.gameModal);
  React.useEffect(() => {
    if (modalData.isSeen) {
      setTimeout(() => {
        dispatch(discardGameData());
      }, 5000)
    }
  }, [modalData.isSeen])
  return (
    <div className="drawing-area-block">
      <Canvas socket={socket}>
        {
          leader &&
          <Avatar avatarID={leader.avatarID} username={leader.username}/>
        }
        <Letters/>
        <Timer />
        {
          isGameStarted &&
          <ColorsBar/>
        }
      </Canvas>
      {
        modalData.isSeen &&
        <div>
          <p>{modalData.word}</p>
          <p>{modalData.winner ? "Победил игрок " + modalData.winner : "Никто не угадал слово"}</p>
          <p>Новая игра начнется через 5 секунд.</p>
        </div>
      }
      {
        !modalData.isSeen && leader && leader.userID === userID && isGameStarted &&
        <ToolBar socket={socket}/>
      }
      {
        !modalData.isSeen && leader && leader.userID === userID && isGameStarted && !isRoundStarted &&
        <ChooseModal onWordChoose={onWordChoose}></ChooseModal>
      }
    </div>
  )
}

export default DrawingArea
