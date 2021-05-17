import React, { useState } from 'react'
import '../styles/stylesLibrary/css/main-styles.css';
import '../styles/stylesLibrary/css/reset.css';

const UserSettings = (props) => {
  const[value, setValue]= useState();
  
  const handleChange = (e) =>{
    setValue(e.target.value)
  }
  return (
    <div className="container-all container-login div-setting">
      <input 
        type="submit" value="Быстрая игра"
        className='all-button button'
        onClick ={(e)=>{props.handleGameClick( e, "Быстрая игра")}}
      />
      <p>...или...</p>
      <input 
        type="submit" value="Создать комнату"
        className='all-button button'
        onClick ={(e)=>{props.handleGameClick(e, "Создать комнату")}}
       />
      <p>...или...</p>
      <div className="formGroup">
        <input 
        type="text" 
        placeholder='Ссылка на комнату' 
        className="input-all input-ok"
        onChange ={handleChange}
        ref = {props.linkRoomRef}
      />
      <input 
        type="submit" value="OK"
        className="button-small-ok all-button"
        onClick ={(e)=>{props.handleGameClick(e , 'link')}}
        onKeyDown ={e => {if (e.code === "Enter")  props.handleGameClick('link')}}
      />
      </div>
    </div>
  )
}

export default UserSettings
