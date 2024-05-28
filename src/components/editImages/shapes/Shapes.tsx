import React, { useContext } from "react";
import { contextBox } from "../../../_context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { CiPill } from "react-icons/ci";
import { IoTriangle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { BiSolidCircleQuarter } from "react-icons/bi";
import "./shapes.css";
const Shapes: React.FC = () => {
  const context = useContext<any>(contextBox);
  function makeShape(shape: string) {
    context.setShapes((prev: any) => [
      ...prev,
      {
        shape: shape,
        selected: true,
        isDrag: false,
        color: context.selectedColor,
        id: Math.random().toString(),
        X: 250,
        Y: 250,
      },
    ]);
  }
  return (
    <div className="shapes-container">
      <div
      className="iconShapeBox"
        onClick={() => {
          makeShape("triangle");
        }}
      >
        <IoTriangle className="iconShape"></IoTriangle>
      </div>
      <div
      className="iconShapeBox"
        onClick={() => {
          makeShape("circle");
        }}
      >
        <FaCircle  className="iconShape"></FaCircle>
      </div>
      <div
      className="iconShapeBox"
        onClick={() => {
          makeShape("pill");
        }}
      >
        <CiPill  className="iconShape"></CiPill>
      </div>
      <div
      className="iconShapeBox"
        onClick={() => {
          makeShape("quarterCircle ");
        }}
      >
        <BiSolidCircleQuarter className="iconShape"></BiSolidCircleQuarter>
      </div>
    </div>
  );
};
export default Shapes;
