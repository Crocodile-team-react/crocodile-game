import React from 'react'
import { useDispatch } from 'react-redux';
import { Brush } from "./tools";
function Canvas({socket, children}) {
  const dispatch = useDispatch();
  const canvasRef = React.useRef();

  React.useEffect(() => {
    socket.on("draw", (figure) => {
      drawHandler(figure);
    })
  }, [])
  React.useEffect(() => {
    dispatch({
      type: "SET_CANVAS",
      payload: {
        canvas: canvasRef.current
      }
    })
  }, [])

  const mouseDownHandler = () => {
    
  }
   const drawHandler = (figure) => {
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case 'finish':
        ctx.beginPath();
        break;
    }
  }
  return (
    <div className="canvas-block">
      {children}
      <canvas
        ref={canvasRef}
        onMouseDown = {mouseDownHandler}
        width="700" height="445"></canvas>
    </div>
  )
}

export default Canvas
