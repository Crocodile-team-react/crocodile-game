import React from 'react';

function Avatar(props) {
  return (
    <span className="avatar-block">
      <span className="avatar-small avatar-crocodile"></span>
      <span className="avatar-block__name">{props.userName}</span>
    </span>
  );
}

export default Avatar;