import React from 'react'

function Canvas(props) {
  return (
    <div className="canvas-block">
      {props.children}
      <canvas width="700" height="445"></canvas>
    </div>
  )
}

export default Canvas
