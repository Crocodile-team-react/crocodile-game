import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';
import '../styles/stylesLibrary/css/main-styles.css';
import '../styles/stylesLibrary/css/reset.css';
import {useDispatch,useSelector} from 'react-redux';

function StartPage() {
  const inputNameRef = React.useRef();
  const dispatch = useDispatch();
  const username1 = useSelector(state => state.username);
  const game = useSelector(state => state.typeGame)
  const handleGameClick = (typeGame) => {
    const username = inputNameRef.current.value;
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
    dispatch({
        type: "setTypeGame",payload: typeGame,
      })
      console.log(game);
  }

  return (
    <div style={{ height: window.innerHeight }} className="wrapper">
                  <Logo />
                  <div className="wrapper2" onSubmit={()=>{}}>
                      <UserSettings inputNameRef={inputNameRef}/>
                      < UserControls handleGameClick={handleGameClick} />
                  </div>
              </div>
  )
}

export default StartPage
