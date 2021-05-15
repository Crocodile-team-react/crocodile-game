import React from 'react'
import   '../styles/stylesLibrary/css/main-styles.css';
import '../styles/stylesLibrary/css/reset.css';
import {useDispatch,useSelector} from 'react-redux';
import Avatars from '../store/avatar-ref';

const UserControls = (props)=>{
    const dispatch = useDispatch();
    let avatarIndex = useSelector(state => state.avatarIndex);

    const SwithAvatarRigth = () =>{
      dispatch({type:"+AvatarIndex", payload: 1});
      console.log(avatarIndex)
    };
    const SwithAvatarLeft = () =>{
      dispatch({type:"-AvatarIndex", payload:  1});
      console.log(avatarIndex)
    };

  return (
    <div className="container-all container-login "> 
        
          <div className='div-control'>
            <button data-arrow='left' 
              className="button-bgi-arrow1 all-button button-arrow"
              onClick={SwithAvatarRigth}
            ></button>
            <div className="container-avatar container-all"
            style={{backgroundImage : `url(${process.env.PUBLIC_URL + Avatars[avatarIndex]})`}}>
            </div>
            <button 
              className="all-button button-arrow button-bgi-arrow2"
              onClick={SwithAvatarLeft}
            ></button>
          </div>
          <div className="div">
            <input  
              type='text' 
              placeholder='Ссылка на комнату' 
              className="input-all input input-name" 
              ref={props.inputRef}
            />
          </div>
        
      </div>
  )
}

export default UserControls
