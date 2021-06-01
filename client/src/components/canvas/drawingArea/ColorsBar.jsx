import React from 'react';
import Color from './Color';
import { useDispatch, useSelector } from 'react-redux';


function ColorsBar(props) {
    const tool = useSelector(state => state.tool.tool);
    console.log(tool)
    const dispatch = useDispatch();
    const handleColorChange = (color) =>{
        console.log(color)
        dispatch({
        type: "SET_COLOR",
        payload: {color}
    })};
    
    return (
    <span className="colors-bar-block">
      {colors.map((code) => (<Color onclick={handleColorChange} colorCode={code} active={tool?.strokeStyle === code}/>))}
    </span>
  );
}

const colors = ["#000", "#F00", "#0F0", "#00F", "#FF0" ,"#0FF", "#FFF", "#AAA", "#555"];

export default ColorsBar;