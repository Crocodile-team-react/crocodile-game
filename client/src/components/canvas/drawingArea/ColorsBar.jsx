import React from 'react';
import Color from './Color';

function ColorsBar(props) {
  return (
    <span className="colors-bar-block">
      <Color colorCode="#F00" active="true"></Color>
      <Color colorCode="#0F0"></Color>
      <Color colorCode="#00F"></Color>
      <Color colorCode="#FF0"></Color>
      <Color colorCode="#0FF"></Color>
      <Color colorCode="#FFF"></Color>
      <Color colorCode="#AAA"></Color>
      <Color colorCode="#555"></Color>
    </span>
  );
}

export default ColorsBar;