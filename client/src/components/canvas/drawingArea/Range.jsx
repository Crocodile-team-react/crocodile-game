import React from 'react';

function Range(props) {
  return (
    <>
        <span className="circle"></span>
        <div className="input-block">
            <input type="range" min="0" max="100" step="1"/>
        </div>
        <span className="circle-fill"></span>
    </>
  );
}

export default Range;
