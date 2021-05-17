import React from 'react'
import '../styles/stylesLibrary/main-styles.scss'

function UserSettings() {
  return (
    <div className="container container-settings "> 
      <div className='div-settings'>
        <button className="arrow-left"/>
        <div className="avatar-big avatar-goose"/>
        <button className="arrow-right"/>
      </div>
      <div className="div ">
        <input type="text" className="input" placeholder="Ваше имя" />
      </div>
    </div>
  )
}

export default UserSettings
