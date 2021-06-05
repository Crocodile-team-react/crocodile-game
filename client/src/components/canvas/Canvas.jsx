import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Brush, Rect, Circle, Eraser, Line, CircleFilled, RectFilled } from "./tools";
import { setCanvas } from '../../store/actions/canvasActions';
import { setGameCounter, setRoundStarted, discardGameData, setGameStarted } from '../../store/actions/gameActions';
import { setTool } from '../../store/actions/toolActions';

function Canvas({socket, children}) {
  const dispatch = useDispatch();
  const canvasRef = React.useRef();
  const userID = useSelector(state => state.user.userID);
  const users = useSelector(state => state.game.users);
  const isRoundStarted = useSelector(state => state.game.isRoundStarted);

  React.useEffect(() => {
    if (isRoundStarted) {
      drawHandler({ type: "clear" })
      handleStartNewRound();
    }
  }, [isRoundStarted])

  React.useEffect(() => {

    dispatch(setCanvas(canvasRef.current));

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
  const handleStartNewRound = () => {
    let leader = users.find(user => user.leader);
    canvasRef.current.removeEventListener("mouseup", mouseUpHandler);
    dispatch(discardGameData());
    dispatch(setGameCounter(60));
    dispatch(setRoundStarted(true));
    if (leader) {
      if (leader.userID === userID) {
        let brush = new Brush(canvasRef.current, socket);
        dispatch(setTool(brush));
        canvasRef.current.addEventListener("mouseup", mouseUpHandler);
      } else {
        dispatch(setTool(null));
      }
    }
  }
  const mouseUpHandler = (e) => {
    socket.emit("image:save", { img: canvasRef.current.toDataURL() });
  }
  const drawHandler = (figure) => {
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y, figure.strokeStyle, figure.lineWidth);
        break;
      case 'rect':
        Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.strokeStyle, figure.lineWidth);
        break;
      case 'circle':
        Circle.draw(ctx, figure.x, figure.y, figure.r, figure.strokeStyle, figure.lineWidth);
        break;
      case 'finish':
        ctx.beginPath();
        break;
      case 'eraser':
        Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth);
        break;
      case 'rectFilled':
        RectFilled.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.strokeStylegit remote add origin);
        break;
      case 'line':
        Line.draw(ctx, figure.x1, figure.y1, figure.x2, figure.y2, figure.strokeStyle, figure.lineWidth);
        break;
      case 'circleFilled':
        CircleFilled.draw(ctx, figure.x, figure.y, figure.r, figure.strokeStyle);
        break;
      case "clear": {
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
        style={{background: "#fff"}}
        ref={canvasRef}
        width="700" height="445"></canvas>
    </div>
  )
}

export default Canvas
