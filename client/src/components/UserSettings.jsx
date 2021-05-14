import React from 'react'
import '../styles/stylesLibrary/css/main-styles.css';
import '../styles/stylesLibrary/css/reset.css'
import '../styles/stylesLibrary/css/setting.css'
import {useDispatch} from 'react-redux';

const UserSettings = () => {
  const dispatch = useDispatch();
  
  const handleClick = (typegame) =>{
      dispatch({type:"setTypeGame", payload:typegame});
  }
  let value;
  const handleChange = (e) =>{
    value = e.target.value;
  }
  return (
    <div className="container-all container-login div-setting">
      <input type='submit'
        className='all-button button'
        value = 'Быстрая игра'
        onClick ={()=>{handleClick("Быстрая игра")}}
      />
      <p>...или...</p>
      <input type='submit'
        className='all-button button'
        value = 'Создать комнату'
        onClick ={()=>{handleClick("Создать комнату")}}
       />
      <p>...или...</p>
      <input 
        type="text" 
        pattern='Ссылка на комнату' 
        className="input-all input-ok"
        onChange ={handleChange}
      />
      <button 
        className="button-hidden"
        onClick ={()=>{handleClick(value)}}
      ></button>
    </div>
  )
}

export default UserSettings
