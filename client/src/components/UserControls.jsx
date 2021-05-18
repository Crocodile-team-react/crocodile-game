import React from 'react';

function UserControls() {
  return (
  <div className="controls-block">
    <button className='button-long-filled' onClick ={f=>f}>Быстрая игра</button>
    <span>...или...</span>
    <button className='button-long-filled' onClick ={f=>f}>Создать комнату</button>
    <span>...или...</span>
    <form className="form-with-inp-but">
      <input type="text" className="input" placeholder="Ссылка на комнату"/>
      <button className="button-short-filled" type="submit">Ок</button>
    </form>
  </div>
  );
}

export default UserControls;
