import React from 'react';

function Color(props) {
  return (
    <button 
      className={props.active?'active color-block':'color-block'} 
      style={{backgroundColor:props.colorCode}}
      onClick={() => props.onclick(props.colorCode)}>
    </button>
  );
}

export default Color;