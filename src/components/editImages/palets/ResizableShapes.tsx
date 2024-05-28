import React, { useContext, useEffect, useRef, useState } from "react";
import { contextBox } from "../../../_context/context";
const ResizableShape: React.FC<any> = ({
  shape,
  isSelected,
  setWidthShape,
  SetHeightShape,
  setDragFalse,
}) => {
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });
  const [rotation, setRotation] = useState(0); // State to track the rotation angle
  const containerRef = useRef<HTMLDivElement>(null);
  const initialAngleRef = useRef<number>(0);
  const context = useContext<any>(contextBox)
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setWidthShape(width);
      SetHeightShape(height);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [setWidthShape, SetHeightShape]);

  const handleRotateStart = (event: React.MouseEvent) => {
    event.preventDefault();
    document.addEventListener('mousemove', handleRotateMove);
    document.addEventListener('mouseup', handleRotateEnd);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
      initialAngleRef.current = angle - rotation * (Math.PI / 180);
    }
  };

  const handleRotateMove = (event: MouseEvent) => {
    setDragFalse()
    event.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
      const newRotation = (angle - initialAngleRef.current) * (180 / Math.PI);
      setRotation(newRotation);
    }
  };

  const handleRotateEnd = () => {
    document.removeEventListener('mousemove', handleRotateMove);
    document.removeEventListener('mouseup', handleRotateEnd);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        overflow: 'auto',
        border: isSelected ? '2px solid blue' : '0px solid black',
        overflowY: 'hidden',
        overflowX: 'hidden',
        padding:"10px",
        position: 'relative',
        resize: isSelected ? 'both' : 'none',
      }}
    >
           {isSelected && (
        <>
          <div
            onMouseDown={handleRotateStart}
            style={{
              width: 10,
              height: 20,
              backgroundColor: "blue",
              position: "absolute",
              top: -10,
              left: -0,
              cursor: "grab",
            }}
          />
          <div
            onMouseDown={handleRotateStart}
            style={{
              width: 10,
              height: 20,
              backgroundColor: "blue",
              position: "absolute",
              top: -10,
              right: -0,
              cursor: "grab",
            }}
          />
          <div
            onMouseDown={handleRotateStart}
            style={{
              width: 10,
              height: 20,
              backgroundColor: "blue",
              position: "absolute",
              bottom: -10,
              left: -0,
              cursor: "grab",
            }}
          />
          <div
            onMouseDown={handleRotateStart}
            style={{
              width: 10,
              height: 20,
              backgroundColor: "blue",
              position: "absolute",
              bottom: -10,
              right: -0,
              cursor: "grab",
            }}
          />
        </>
      )}
      <div
        className={`unselectable ${shape}`}
        draggable="false"
        onDragStart={(e: any) => e.preventDefault()}
        style={{
          backgroundColor: context.selectedColor,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `rotate(${rotation}deg)`,
        }}
      ></div>
    </div>
  );
};

export default ResizableShape