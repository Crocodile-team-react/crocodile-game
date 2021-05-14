import React from 'react'
import   '../styles/stylesLibrary/css/main-styles.css';
import '../styles/stylesLibrary/css/reset.css';
import '../styles/stylesLibrary/css/login.css';
import {useDispatch,useSelector} from 'react-redux';
import Avatars from '../store/avatar-ref';

const UserControls = (props)=>{
    const dispatch = useDispatch();
    let avatarIndex = useSelector(state => state.avatarIndex);

    const handleClick1 = () =>{
      dispatch({type:"+AvatarIndex", payload: 1});
      console.log(avatarIndex)
    };
    const handleClick2 = () =>{
      dispatch({type:"-AvatarIndex", payload:  1});
      console.log(avatarIndex)
    };

    const name = useSelector(state=> state.name)
    const handleChange = (e) => {
      dispatch({type:"setName", payload: e.target.value});
    };
    
    
  return (
    <div className="container-all container-login "> 
        <div className='wrapper'>
          <div className='div-control'>
            <button data-arrow='left' 
              className="button-bgi-arrow1 all-button button-arrow"
              onClick={handleClick1}
            ></button>
            <div className="container-avatar container-all"
            style={{backgroundImage : `url(${process.env.PUBLIC_URL + Avatars[avatarIndex]})`}}>
            </div>
            <button 
              className="all-button button-arrow button-bgi-arrow2"
              onClick={handleClick2}
            ></button>
          </div>
          <div className="div">
            <input  
              type='text' 
              pattern='Ссылка на комнату' 
              className="input-all input input-name" 
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
  )
}

export default UserControls
