import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Brush, Rect, Circle, Eraser,  Line} from "./tools";
import CircleFilled from "./tools/CircleFilled"
import RectFilled from './tools/RectFilled'

function Canvas({socket, children, onGameEndScreenShot}) {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.user.userID);
  const leader = useSelector(state => state.game.users.find(user => {
    return user.leader;
  }));
  const isRoundStarted = useSelector(state => state.game.isRoundStarted);
  const canvasRef = React.useRef();
  React.useEffect(() => {
    if (!isRoundStarted) {
      drawHandler({ type: "clear" })
    }
  }, [isRoundStarted])

  React.useEffect(() => {
    dispatch({
      type: "SET_CANVAS",
      payload: {
        canvas: canvasRef.current
      }
    })

    socket.emit("image:get", (response) => {
      const img = new Image();
        img.src = response.data;
        const ctx = canvasRef.current.getContext('2d');
        img.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    })
  }, [])

  React.useEffect(() => {
    socket.on("draw", (figure) => {
      drawHandler(figure);
    })
    return () => {
      socket.removeListener("draw");
    }
  }, [])

  React.useEffect(() => {
    canvasRef.current.removeEventListener("mouseup", mouseUpHandler);
    if (leader) {
      if (leader.userID === userID) {
        canvasRef.current.addEventListener("mouseup", mouseUpHandler);
      }
    }
  }, [leader])

  const mouseUpHandler = (e) => {
    socket.emit("image:save", { img: canvasRef.current.toDataURL() });
  }
  const drawHandler = (figure) => {
    const ctx = canvasRef.current.getContext('2d');
    console.log(figure.type)
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case 'rect':
        Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height);
        break;
      case 'circle':
        Circle.draw(ctx, figure.x, figure.y, figure.r);
        break;
      case 'finish':
        ctx.beginPath();
        break;
      case 'eraser':
        Eraser.draw(ctx, figure.x, figure.y);
        break;
      case 'rectFilled':
        RectFilled.draw(ctx, figure.x, figure.y, figure.width, figure.height);
        break;
      case 'line':
        Line.draw(ctx, figure.x1, figure.y1, figure.x2, figure.y2);
        break;
      case 'circleFilled':
        CircleFilled.draw(ctx, figure.x, figure.y, figure.r);
        break;
      case "clear": {
        onGameEndScreenShot(canvasRef);
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      default: {
        return;
      }
    }
  }
 
  return (
    <div className="canvas-block">
      {children}
      <canvas
        ref={canvasRef}
        width="700" height="445"></canvas>
    </div>
  )
}

export default Canvas;
