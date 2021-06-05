import React,{useState} from 'react';
import Color from './Color';
import { setColor } from '../../../store/actions/toolActions';
import { useDispatch , useSelector} from 'react-redux';

function ColorsBar() {
  const dispatch = useDispatch();
  const opacity = useSelector(state => state.tool.opacity);
  console.log(opacity)
  const colors = [`rgba(0, 0, 0, ${opacity} )`, 
                  `rgba(255, 0, 0, ${opacity})`,
                  `rgba(0, 255, 0, ${opacity})`, 
                  `rgba( 0, 0, 255, ${opacity})`,
                  `rgba(255, 255, 0, ${opacity})`,
                  `rgba( 0, 255, 255, ${opacity})` ,
                  `rgba(255, 255, 255, ${opacity})`, 
                  `rgba(170, 170, 170, ${opacity})`, 
                  `rgba(85, 85, 85, ${opacity})`];
  
  const handleColorChange = (color) => {
    console.log(color)
    dispatch(setColor(color));
  }
  const col = ["#000", "#F00", "#0F0", "#00F", "#FF0" ,"#0FF", "#FFF", "#AAA", "#555"];
  return (
    <span className="colors-bar-block">
      {
        colors.map((code,i) => {
          return <Color key={code} onClick={handleColorChange} colorCode={code} active={false} col={col[i]}/>
        })
      }
    </span>
  );
}




export default ColorsBar;