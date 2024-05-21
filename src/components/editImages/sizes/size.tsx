
import React, { useContext, useState } from "react";
import { defaultSize } from "./interface";
import "./style.css";
import { contextBox } from "../../../_context/context";

export default function Size() {
  const [isShowSize, setIsShowSize] = useState<Boolean>(false);
  const context = useContext<any>(contextBox);
  const defaultBrushSize = Object.values(defaultSize);
  function changeBrushSize(size:String| Number,isClose?:boolean) {
    context.setBrushSize(size);
    if (isClose) {
      setIsShowSize(false)
    }
  }
  return (
    <div className="sizeToolBar">
      <div className="sizeBtn">
        <button onClick={(e) => setIsShowSize(!isShowSize)}>size</button>
        <div
          style={{
            display: "flex",
          }}
        >
          {" "}
          <input
            type="number"
            onChange={(e) => changeBrushSize(e.target.value)}
            value={`${context.brushSize}`}
            min={1}
            max={100}
            style={{
              width: "40px",
            }}
          />
          {/* <p>px</p> */}
        </div>
      </div>

      {isShowSize && (
        <div className="sizesBar">
          {defaultBrushSize.map((size: string) => (
            <div
              onClick={(e) => changeBrushSize(size,true)}
              className="sizes"
              key={size}
            >
              <div
                style={{
                  height: `${size}px`,
                  backgroundColor: "#000",
                  width: "80px",
                }}
              ></div>
              <p>{size}px</p>
            </div>
          ))}
          <div className="sizes" style={{ display: "flex" }}>
            <input
              style={{
                width: "80px",
              }}
              onChange={(e) => changeBrushSize(e.target.value)}
              value={context.brushSize}
              type="range"
              min="0"
              max="50"
            />
            <p>{context.brushSize}px</p>
          </div>
        </div>
      )}
    </div>
  );
}
