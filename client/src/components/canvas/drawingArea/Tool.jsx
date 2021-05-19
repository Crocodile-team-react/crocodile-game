import React from 'react';

function Tool(props) {
  return (
    <button className={props.className} onClick={f=>f}></button>
  );
}

export default Tool;
