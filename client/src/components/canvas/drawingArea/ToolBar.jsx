import React from 'react';
import Tool from './Tool';
import Range from './Range';
import { Brush, Circle, Rect, Eraser, Line } from '../tools';
import { useDispatch, useSelector } from 'react-redux';

function ToolBar({socket}) {
  const dispatch = useDispatch();
  const canvas = useSelector(state => state.canvas.canvas);
  const tool = useSelector(state => state.tool.tool);
  return (
    <div className="tool-bar-block">
      <div className="tool-bar-block__tools">
        <Tool onToolClick={() => {
          dispatch({ type: "SET_TOOL", payload: {tool: new tools[0].Component(canvas, socket)}});
        }} className={tools[0].name +" "+ tools[0].active?"active": ""}/>
        <Tool className="rubber"/>
        <Tool className="square"/>
        <Tool className="circle"/>
        <Tool className="square-fill"/>
        <Tool className="circle-fill"/>
        <Tool className="line"/>
        <Tool className="fill"/>
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
  }
]

export default ToolBar;
