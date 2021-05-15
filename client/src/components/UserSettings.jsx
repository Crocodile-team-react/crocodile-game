import React from 'react'
import '../styles/stylesLibrary/css/main-styles.css';
import '../styles/stylesLibrary/css/reset.css';
import {useDispatch} from 'react-redux';

const UserSettings = () => {
  
  let value;
  const handleChange = (e) =>{
    value = e.target.value;
  }
  return (
    <div className="container-all container-login div-setting">
      <button
        className='all-button button'
        onClick ={()=>{handleGameClick("Быстрая игра")}}
      >Быстрая игра</button>
      <p>...или...</p>
      <button
        className='all-button button'
        onClick ={()=>{handleGameClick("Создать комнату")}}
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
        onClick ={()=>{handleGameClick(value)}}
      ></button>
      </div>
    </div>
  )
}

export default UserSettings
