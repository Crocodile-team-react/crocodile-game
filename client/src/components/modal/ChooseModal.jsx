import React from 'react';
import Modal from './Modal';

function ChooseModal(props) {
  return (
    <Modal w="446" h="390" className="choose-modal-block dark">
      <h3 className="title text-medium">Жребий великого рандома пал на тебя!</h3>
      <p className="text-small">Выбери слово, которое будешь изображать</p>
      <button className="button-long-filled" onClick={f=>f}>Ручка</button>
      <button className="button-long-filled" onClick={f=>f}>Прокрастинация</button>
      <button className="button-long-filled" onClick={f=>f}>Крокодил</button>
      <button className="button-medium-unfilled" onClick={f=>f}>Пропустить</button>
    </Modal>
  );
}

export default ChooseModal;
