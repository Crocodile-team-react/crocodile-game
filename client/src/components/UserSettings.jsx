import React from 'react'
import '../styles/stylesLibrary/main-styles.scss'

function UserSettings() {
  return (
    <div className="container container-settings "> 
      <div className='div-settings'>
        <span className="arrow-left"></span>
        <div className="avatar-big avatar-goose" >
        </div>
        <span className="arrow-right"></span>
      </div>
      <div className="div ">
        <input type="text" className="input" placeholder="Ваше имя" />
      </div>
    </div>
  )
}

export default UserSettings
