import React from 'react';

function Color(props) {
  return (
    <span className={props.active?'active color-block':'color-block'} style={{backgroundColor:props.colorCode}}>
    </span>
  );
}

export default Color;