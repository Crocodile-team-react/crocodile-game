import React, { useState } from 'react'
import '../styles/stylesLibrary/css/main-styles.css';
import '../styles/stylesLibrary/css/reset.css';
import {useDispatch} from 'react-redux';

const UserSettings = (props) => {
  const[value, setValue]= useState();
  
  const handleChange = (e) =>{
    setValue(e.target.value)
  }
  return (
    <div className="container-all container-login div-setting">
      <button
        className='all-button button'
        onClick ={()=>{props.handleGameClick("Быстрая игра")}}
      >Быстрая игра</button>
      <p>...или...</p>
      <button
        className='all-button button'
        onClick ={()=>{props.handleGameClick("Создать комнату")}}
       >Создать комнату</button>
      <p>...или...</p>
      <div className="formGroup">
        <input 
        type="text" 
        placeholder='Ссылка на комнату' 
        className="input-all input-ok"
        onChange ={handleChange}
        
      />
      <button 
        className="button-small-ok all-button"
        onClick ={()=>{props.handleGameClick(value)}}
      ></button>
      </div>
    </div>
  )
}

export default UserSettings
