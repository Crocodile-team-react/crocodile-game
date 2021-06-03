import React from 'react';

function Range({onChange}) {
  return (
    <>
        <span className="circle"></span>
        <div className="input-block">
          <input onChange={onChange} type="range" min="0" max="100" step="1"/>
        </div>
        <span className="circle-fill"></span>
    </>
  );
}

export default Range;
