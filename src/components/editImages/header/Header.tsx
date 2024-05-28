import React, { useState } from 'react'
import './style.css';
import Tools from '../tools/Tools'
import Colors from '../colors/Colors';
import Size from '../sizes/size';
import BackAndAhead from '../backAndAhead/BackAndAhead'
import Shapes from '../shapes/Shapes';
export default function Header() {
  
  return (
    <div className='headerBar'>
      <Tools></Tools>
      <Shapes></Shapes>
      <BackAndAhead />
      <Size></Size>
      <Colors></Colors>
    </div>
  )
}
