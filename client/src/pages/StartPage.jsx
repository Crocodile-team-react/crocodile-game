import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';

function StartPage() {
  return (
    <div style={{ height: window.innerHeight }} className="wrapper-start-page ">
      <Logo />
      <form action='#' className="wrapper-forma" >
          <UserSettings/>
          < UserControls/>
      </form>
    </div>
  )
}

export default StartPage
