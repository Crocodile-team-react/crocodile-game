import React from 'react';
import { Canvas, ToolBar, Avatar, Letters, Timer, ColorsBar, ChooseModal } from '../index.js';
import { useSelector } from 'react-redux';
function DrawingArea({onWordChoose}) {
  const id = useSelector(state => state.user.userID);
  const user = useSelector(state => state.game.users.filter(user => {
    return user.userID == id;
  }));
  const isGameStarted = useSelector(state => state.game.isGameStarted);
  return (
    <div className="drawing-area-block">
      <Canvas>
        <Avatar avatar="avatar-crocodile" userName="Player 1"/>
        <Letters/>
        <Timer />
        {
          user.length && user[0].leader && isGameStarted &&
          <ColorsBar/>
        }
      </Canvas>
      {
        user.length && user[0].leader && isGameStarted &&
        <ToolBar/>
      }
      <ChooseModal onWordChoose={onWordChoose}></ChooseModal>
      {/* <WinnerModal></WinnerModal> */}
    </div>
  )
}

export default DrawingArea
