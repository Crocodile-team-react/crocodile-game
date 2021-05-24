import React from 'react';
import Modal from './Modal';
import {difficultWords, averageWords, simpleWords} from '../vocabulary/vocabulary.js'


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

const arrWords = [];
arrWords.push(simpleWords[getRandomInt(simpleWords.length-1)]);
arrWords.push(averageWords[getRandomInt(averageWords.length-1)]);
arrWords.push(difficultWords[getRandomInt(difficultWords.length-1)]);

function ChooseModal({onWordChoose}) {
  return (
    <Modal w="446" h="390" className="choose-modal-block dark">
      <h3 className="title text-medium">Жребий великого рандома пал на тебя!</h3>
      <p className="text-small">Выбери слово, которое будешь изображать</p>
      <button className="button-long-filled" onClick={() => onWordChoose(arrWords[0])}>{arrWords[0]}</button>
      <button className="button-long-filled" onClick={() => onWordChoose(arrWords[1])}>{arrWords[1]}</button>
      <button className="button-long-filled" onClick={() => onWordChoose(arrWords[2])}>{arrWords[2]}</button>
    </Modal>
  );
}

export default ChooseModal;
