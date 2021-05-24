import React from 'react';
import Modal from './Modal';

const words = ["ручка", "Прокрастинация", "Крокодил"];


function ChooseModal({onWordChoose}) {
  return (
    <Modal w="446" h="390" className="choose-modal-block dark">
      <h3 className="title text-medium">Жребий великого рандома пал на тебя!</h3>
      <p className="text-small">Выбери слово, которое будешь изображать</p>
      <button className="button-long-filled" onClick={() => onWordChoose(words[0])}>{words[0]}</button>
      <button className="button-long-filled" onClick={() => onWordChoose(words[1])}>{words[1]}</button>
      <button className="button-long-filled" onClick={() => onWordChoose(words[2])}>{words[2]}</button>
    </Modal>
  );
}

export default ChooseModal;
