import React,{useState} from 'react';
import Color from './Color';
import { setColor } from '../../../store/actions/toolActions';
import {useDispatch} from 'react-redux';

const ColorsBar = () => {
  const dispatch = useDispatch();
  
  const colors = [`rgba(0, 0, 0, 1 )`,
                  `rgba(255, 0, 0, 1)`,
                  `rgba(0, 255, 0, 1)`,
                  `rgba( 0, 0, 255, 1)`,
                  `rgba(255, 255, 0, 1)`,
                  `rgba( 0, 255, 255, 1)`,
                  `rgba(255, 0, 255, 1)`,
                  `rgba(170, 170, 170, 1)`,
                  `rgba(85, 85, 85, 1)`];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  
  const handleColorChange = (color) => {
    dispatch(setColor(color));
    setSelectedColor(color);
  }
  
  return (
    <span className="colors-bar-block">
      {
        colors.map((code) => {
          return <Color key={code} onClick={handleColorChange} colorCode={code} selectedColor={selectedColor} />
        })
      }
    </span>
  );
}





export default ColorsBar;