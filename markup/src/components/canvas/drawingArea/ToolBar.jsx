import React from 'react';
import Tool from './Tool';
import Range from './Range';

function ToolBar() {
  return (
    <div className="tool-bar-block">
      <div className="tool-bar-block__tools">
        <Tool className="pencil active"></Tool>
        <Tool className="rubber"></Tool>
        <Tool className="square"></Tool>
        <Tool className="circle"></Tool>
        <Tool className="square-fill"></Tool>
        <Tool className="circle-fill"></Tool>
        <Tool className="line"></Tool>
        <Tool className="fill"></Tool>
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

export default ToolBar;
