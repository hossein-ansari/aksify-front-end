import React, { useContext } from "react";
import { contextBox } from "../../../_context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import './backAndAhead.css'

export default function BackAndAhead() {
  const context: any = useContext(contextBox);
  function moveBack() {
    let newCircles = [...context.circles];
    let circlesRemoved = [...context.circlesRemoved];
    if (newCircles[0]) {
      let circlesLength = newCircles.length;
      circlesRemoved.push(newCircles[circlesLength - 1]);
      newCircles.pop();
      circlesLength = newCircles.length;
      circlesRemoved.push(newCircles[circlesLength - 1]);
      newCircles.pop();
      context.setCircles(newCircles);
      context.setCirclesRemoved(circlesRemoved);
    }
  }
  function moveAhead() {
    let newCircles = [...context.circles];
    let circlesRemoved = [...context.circlesRemoved];
    if (circlesRemoved[0]) {
      let circlesLength = circlesRemoved.length;
      newCircles.push(circlesRemoved[circlesLength - 1]);
      circlesRemoved.pop();
      circlesLength = circlesRemoved.length;
      newCircles.push(circlesRemoved[circlesLength - 1]);
      circlesRemoved.pop();
      context.setCircles(newCircles);
      context.setCirclesRemoved(circlesRemoved);
    }
  }
  return (
    <div className="undoRedo">
      <div onClick={moveBack}><FontAwesomeIcon icon={faUndo }></FontAwesomeIcon></div>
      <div onClick={moveAhead}><FontAwesomeIcon icon={faRedo }></FontAwesomeIcon></div>
    </div>
  );
}
