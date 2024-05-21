
import React, { useContext, useState } from "react";
import { contextBox } from "../../../_context/context";
import "./style.css";
export default function Tools() {
  const context:any = useContext(contextBox);
  const [tools, setTools] = useState<any>([
    { icon: "brush", name: "brush", style: "select" },
    { icon: "eraser", name: "eraser", style: "unSelect" },
  ]);
  function selectTool(tool:any) {
    const toolsCopy = [...tools];
    const toolSelectedBefore:any = toolsCopy.find(
      (e) => e.style === "select"
    );
    toolSelectedBefore.style = "unSelect";
    const toolSelected: any = toolsCopy.find(
      (e) => e.name === tool.name
    );
    toolSelected.style = "select";
    context.setSelectedTool(tool.name)
    setTools(toolsCopy);
  }
  return (
    <div className="toolBar">
      {tools.map((tool:any) => (
        <div key={tool.name}>
          <p className={`${tool.style} tool`} onClick={(e) => selectTool(tool)}>
            {tool.icon}
          </p>
        </div>
      ))}
    </div>
  );
}
