import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';
import '../styles/stylesLibrary/css/startPage.css'

function StartPage() {
  return (
    <div style={{ height: window.innerHeight }} className="wrapper">
                  <Logo />
                  <div style={{position:"relative"}}>
                  <form className="wrapper2" onSubmit={()=>{}}>
                      <UserControls/>
                      <UserSettings />
                  </form>
                  </div>
              </div>
  )
}

export default StartPage
