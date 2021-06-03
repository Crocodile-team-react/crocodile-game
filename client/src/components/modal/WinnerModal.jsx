import React from 'react';
import Modal from './Modal';

function WinnerModal({children, word, img}){
  console.log(img)
  return (
    <Modal w="280" className="winner-modal-block">
      <h3 className="title">{word}</h3>
      {
        children
      }
      <form   className="form-with-inp-but button-long-filled copy">
         <a {...img}>скачать картинку</a>
      </form>
    </Modal>
  );
}

export default WinnerModal;
