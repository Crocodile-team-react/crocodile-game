import React from 'react';
import Color from './Color';
import { setColor } from '../../../store/actions/toolActions';
import { useDispatch } from 'react-redux';

function ColorsBar() {
  const dispatch = useDispatch();
  
  const handleColorChange = (color) => {
    dispatch(setColor(color));
  }

  return (
    <span className="colors-bar-block">
      {
        colors.map((code) => {
          return <Color key={code} onClick={handleColorChange} colorCode={code} active={false}/>
        })
      }
    </span>
  );
}

const colors = ["#000", "#F00", "#0F0", "#00F", "#FF0" ,"#0FF", "#FFF", "#AAA", "#555"];

export default ColorsBar;