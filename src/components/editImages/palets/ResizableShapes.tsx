import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { contextBox } from "../../../_context/context";

interface ImgDimensions {
  width: number;
  height: number;
}

const ResizableShape: React.FC<any> = ({
  shape,
  isSelected,
  setDragFalse,
  deleteItem,
}) => {
  const [rotation, setRotation] = useState(0);
  // State to store the image's natural dimensions
  const [imgDimensions, setImgDimensions] = useState<ImgDimensions | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialAngleRef = useRef<number>(0);
  const context = useContext<any>(contextBox);

  // Load the image to get its natural dimensions
  useEffect(() => {
    const img = new Image();
    img.src = shape.product_image;
    img.onload = () => {
      setImgDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [shape.product_image]);

  const handleRotateStart = (event: React.MouseEvent) => {
    event.preventDefault();
    document.addEventListener("mousemove", handleRotateMove);
    document.addEventListener("mouseup", handleRotateEnd);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX
      );
      initialAngleRef.current = angle - rotation * (Math.PI / 180);
    }
  };

  const handleRotateMove = (event: MouseEvent) => {
    setDragFalse();
    event.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX
      );
      const newRotation = (angle - initialAngleRef.current) * (180 / Math.PI);
      setRotation(newRotation);
    }
  };

  const handleRotateEnd = () => {
    document.removeEventListener("mousemove", handleRotateMove);
    document.removeEventListener("mouseup", handleRotateEnd);
  };

  return (
    <div
      ref={containerRef}
      style={{
        // Optionally, if you want the container to fit the image,
        // you can use the image's dimensions or default to 100%
        width: imgDimensions ? imgDimensions.width : "100%",
        height: imgDimensions ? imgDimensions.height : "100%",
        overflow: "hidden",
        border: isSelected ? "2px solid blue" : "0px solid black",
        padding: "10px",
        position: "relative",
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
              left: 0,
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
              left: 0,
              cursor: "grab",
            }}
          />
        </>
      )}

      {isSelected && (
        <div
          style={{
            width: 10,
            height: 25,
            position: "absolute",
            zIndex: 100,
            top: 0,
            right: 5,
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            style={{ color: "red" }}
            onClick={() => {
              deleteItem(shape.product_id);
            }}
            icon={faTrash}
          />
        </div>
      )}

      {/* Once the image dimensions are loaded, display the image */}
      {imgDimensions ? (
        <img
          src={shape.product_image}
          alt=""
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          style={{
            width: imgDimensions.width,
            height: imgDimensions.height,
            transform: `rotate(${rotation}deg)`,
            display: "block",
          }}
        />
      ) : (
        // Optionally, you can show a placeholder or loader until the image is loaded.
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ResizableShape;
