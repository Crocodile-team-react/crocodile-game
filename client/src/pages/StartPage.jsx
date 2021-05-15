import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';
import '../styles/stylesLibrary/css/main-styles.css';
import '../styles/stylesLibrary/css/reset.css';

function StartPage() {
  const inputNameRef = React.useRef();

  const handleGameClick = () => {
    const username = inputRef.current.value;
    if(username.length) {
      dispatch({
        type: ""
      })
    }
  }

  return (
    <div style={{ height: window.innerHeight }} className="wrapper">
                  <Logo />
                  <div className="wrapper2" onSubmit={()=>{}}>
                      <UserControls inputRef={inputRef}/>
                      <UserSettings handleGameClick={handleGameClick}/>
                  </div>
              </div>
  )
}

export default StartPage
