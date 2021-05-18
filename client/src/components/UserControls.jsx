import React from 'react'


function UserControls() {
  return(
    <div className="container container-settings div-controls ">
      <input 
        type="submit" value="Быстрая игра"
        className='button-long-filled'
        onClick ={()=>{}}
      />
      <p>...или...</p>
      <input 
        type="submit" value="Создать комнату  "
        className='button-long-filled'
        onClick ={()=>{}}
       />
      <p>...или...</p>
      <div className="form-with-inp-but div-form">
        <input type="text" className="input" placeholder="Ссылка на комнату"/>
        <button className="button-short-filled" type="submit">Ок</button>
      </div>
    </div>
  )
}

export default UserControls
