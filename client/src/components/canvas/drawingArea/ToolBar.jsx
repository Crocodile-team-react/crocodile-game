import React from 'react';
import Tool from './Tool';
import Range from './Range';
import { Brush, Circle, Rect, Eraser, Line, } from '../tools';
import CircleFilled from "../tools/CircleFilled"
import RectFilled from '../tools/RectFilled'
import { useDispatch, useSelector } from 'react-redux';

function ToolBar({socket}) {
  const dispatch = useDispatch();
  const canvas = useSelector(state => state.canvas.canvas);
  const tool = useSelector(state => state.tool.tool);

  const handleToolClick = (curTool) => {
    tools.forEach(tool => {
      tool.active = false;
      if (tool.name === curTool.name) {
        tool.active = true;
      }
      return tool;
    })
    dispatch({
      type: "SET_TOOL",
      payload: {
        tool: new curTool.Component(canvas, socket)
      }
    });
  }
  
  return (
    <div className="tool-bar-block">
      <div className="tool-bar-block__tools">
        {
          tools.map(tool => {
            let className = tool.name;
            if (tool.active) {
              className += " active";
            }
            return <Tool key={tool.name} onToolClick={() => handleToolClick(tool)}
              className={className} />
          })
        }
        {/* <Tool className="rubber"/> */}
        {/* <Tool className="circle"/>
        <Tool className="square-fill"/>
        <Tool className="circle-fill"/>
        <Tool className="line"/>
        <Tool className="fill"/> */}
      </div>
      <div className="tool-bar-block__arrows">
        <button className="arrow-previous"></button>
        <button className="arrow-next"></button>
      </div>
      <div className="tool-bar-block__thickness">
        <Tool className="thickness xs"></Tool>
        <Tool className="thickness s active"></Tool>
        <Tool className="thickness m"></Tool>
        <Tool className="thickness l"></Tool>
        <Tool className="thickness xl"></Tool>
      </div>
      <div className="tool-bar-block__opacity">
        <Range></Range>
      </div>
    </div>
  );
}

const tools = [
  {
    name: "pencil",
    Component: Brush,
    active: true,
  },
  {
    name: "square-fill",
    Component: RectFilled,
    active: false,
  },
  {
    name: "circle-fill",
    Component: CircleFilled,
    active: false,
  },
  {
    name: "line",
    Component: Line,
    active: false,
  },
  {
    name: "eraser",
    Component: Eraser,
    active: false,
  },
  {
    name: "square",
    Component: Rect,
    active: false,
  },
  {
    name: "circle",
    Component: Circle,
    active: false,
  },
]

export default ToolBar;
