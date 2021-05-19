import React from 'react';
import Modal from './Modal';

function RoomNotFound(props) {
  return (
    <Modal w="446" h="315" className="room-not-found-block dark">
      <h3 className="title text-medium">Комната не найдена!</h3>
      <span className="error-exclamation"></span>
      <p className="text-small">Данная ссылка больше не активна</p>
      <button className="button-medium-filled" onClick={f=>f}>Ладно</button>
  </Modal>
  );
}

export default RoomNotFound;
