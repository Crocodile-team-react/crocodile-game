import React from 'react';
import Modal from './Modal';

function WinnerModal({children, word, handelClick}){
  
  return (
    <Modal w="280" className="winner-modal-block">
      <h3 className="title">{word}</h3>
      {
        children
      }
      <form className="form-with-inp-but">
         <button className=" button-long-filled copy" onClick={handelClick}>скачать картинку</button>
      </form>
    </Modal>
  );
}

export default WinnerModal;
