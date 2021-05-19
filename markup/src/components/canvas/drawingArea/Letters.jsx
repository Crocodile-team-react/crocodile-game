import React from 'react';
import Letter from './Letter';

function Letters(props) {
  return (
    <span className="letters-block">
      <Letter></Letter>
      <Letter></Letter>
      <Letter>о</Letter>
      <Letter></Letter>
      <Letter></Letter>
      <Letter></Letter>
      <Letter>и</Letter>
      <Letter></Letter>
    </span>
  );
}

export default Letters;