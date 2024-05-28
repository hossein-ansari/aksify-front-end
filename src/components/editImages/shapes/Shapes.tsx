import React, { useContext } from "react";
import { contextBox } from "../../../_context/context";
import {
  FaPlay,
  FaGem,
  FaEllo,
  FaCloud,
  FaRainbow,
  FaShapes,
  FaHeart,
  FaStar,
} from "react-icons/fa";
const Shapes: React.FC = () => {
  const context = useContext<any>(contextBox);
  function makeShape(shape: string) {
    context.setShapes((prev: any) => [
      ...prev,
      {
        shape: shape,
        selected: true,
        isDrag: false,
        id: Math.random().toString(),
        X: 250,
        Y: 250,
      },
    ]);
  }
  return (
    <div className="shapes-container">
      <div onClick={()=>{makeShape("triangle")}}>
        <FaPlay className="icon" />
      </div>
      <div onClick={()=>{makeShape("elliptical")}}>
        <FaGem className="icon" />
      </div>
      <div onClick={()=>{makeShape("trapezoid")}}>
        <FaEllo className="icon" />
      </div>
      <div onClick={()=>{makeShape("circle")}}>
        <FaCloud className="icon" />
      </div>
      <div onClick={()=>{makeShape("rainbow")}}>
        <FaRainbow className="icon" />
      </div>
      <div onClick={()=>{makeShape("pentagon")}}>
        <FaShapes className="icon" />
      </div>
      <div onClick={()=>{makeShape("heart")}}>
        <FaHeart className="icon" />
      </div>
      <div onClick={()=>{makeShape("star")}}>
        <FaStar className="icon" />
      </div>
    </div>
  );
};
export default Shapes;
