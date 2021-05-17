import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';
import '../styles/stylesLibrary/css/main-styles.css';
import '../styles/stylesLibrary/css/reset.css';
import {useDispatch,useSelector} from 'react-redux';

function StartPage() {
  const inputNameRef = React.useRef();
  const linkRoomRef = React.useRef();
  const dispatch = useDispatch();
  const username1 = useSelector(state => state.username);
  const handleGameClick = (e, typeGame) => {
    e.preventDefault();
    const username = inputNameRef.current.value.trim();
    const linkRoom = linkRoomRef.current.value.trim();
    if(username.length) {
      dispatch({
        type: "setName",payload:username
      })
      console.log(username1)
    }
    else{
      inputNameRef.current.classList.add('error-input');
      inputNameRef.current.setAttribute('placeholder','Вы звбыли ввести имя')
      return;
    }
    if((typeGame==='link'&& linkRoom) || typeGame==="Создать комнату" || typeGame==="Быстрая игра"){
      dispatch({
        type: "setTypeGame",payload: typeGame,
      })
    }
    else{
      console.log(linkRoomRef)
      linkRoomRef.current.classList.add('error-input');
      linkRoomRef.current.setAttribute('placeholder','Вы звбыли ввести ссылку')
    }
  }

  return (
    <div style={{ height: window.innerHeight }} className="wrapper">
                  <Logo />
                  <form action='#' className="wrapper2" onSubmit={()=>{}}>
                      <UserSettings inputNameRef={inputNameRef}/>
                      < UserControls handleGameClick={handleGameClick} 
                        linkRoomRef={linkRoomRef}
                      />
                  </form>
              </div>
  )
}

export default StartPage
