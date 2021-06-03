import React, {useState} from 'react';
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
  const wordHint = useSelector(state => state.user.wordHint);
  const [img, setImg] = useState({
    download: null,
    href: null,
  });
  
  React.useEffect(() => {
    if (modalData.isSeen) {
      setTimeout(() => {
        dispatch(discardGameData());
      }, 5000)
    }
  }, [modalData.isSeen]);

  

  const onGameEndScreenShot = (canvasRef) => {
    setImg({download:  wordHint +".jpeg", href:canvasRef.current.toDataURL('image/jpeg')});
  }
  
  

  return (
    <div className="drawing-area-block">
      <Canvas socket={socket}  onGameEndScreenShot={onGameEndScreenShot} >
        {
          leader &&
          <Avatar avatarID={leader.avatarID} username={leader.username} />
        }
        <Letters/>
        <Timer/>
        {
          !modalData.isSeen && leader && leader.userID === userID && isGameStarted &&
          <ColorsBar/>
        }
        {
          !modalData.isSeen && leader && leader.userID === userID && isGameStarted &&
          <p className="word-hint">{wordHint}</p>
        }
        {
          modalData.isSeen &&
          
          <WinnerModal word={modalData.word}  img={img}>
            <p className="win-text">{modalData.winner ? "Победил игрок " + modalData.winner: "Никто не угадал слово"}</p>
            <p className="win-text">Новая игра начнется через 5 секунд.</p>
          </WinnerModal>
        }
       
      </Canvas >
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
