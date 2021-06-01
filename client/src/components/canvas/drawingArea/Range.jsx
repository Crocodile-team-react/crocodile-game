import React from 'react';

function Range(props) {
  return (
    <>
        <span className="circle"></span>
        <div className="input-block">
            <input type="range" min="0" max="1" step="0.01" onChange={(e) => props.onChange(+e.target.value)}/>
        </div>
        <span className="circle-fill"></span>
    </>
  );
}

export default Range;
