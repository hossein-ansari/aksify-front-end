import React, { useContext, useState } from "react";
import { contextBox } from "../../../_context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import Shapes from "../shapes/Shapes";

import "./style.css";
export default function Tools() {
  const context: any = useContext(contextBox);
  const [tools, setTools] = useState<any>([
    { icon: faPaintBrush, name: "brush", style: "select" },
    { icon: faEraser, name: "eraser", style: "unSelect" },
  ]);
  function selectTool(tool: any) {
    const toolsCopy = [...tools];
    const toolSelectedBefore: any = toolsCopy.find((e) => e.style === "select");
    toolSelectedBefore.style = "unSelect";
    const toolSelected: any = toolsCopy.find((e) => e.name === tool.name);
    toolSelected.style = "select";
    context.setSelectedTool(tool.name);
    setTools(toolsCopy);
  }
  return (
    <div className="">
      <Shapes></Shapes>
      <div className="toolBar">
        {tools.map((tool: any) => (
          <div key={tool.name}>
            <p
              className={`${tool.style} tool`}
              onClick={(e) => selectTool(tool)}
            >
              <FontAwesomeIcon icon={tool.icon}></FontAwesomeIcon>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
