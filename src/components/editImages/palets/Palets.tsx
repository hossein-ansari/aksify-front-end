import React, { useContext, useEffect, useRef, useState } from "react";
import IImage from "./interface";
import "./style.css";
import { contextBox } from "../../../_context/context";
import domtoimage from "dom-to-image";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const ResizableImage: React.FC<any> = ({ src, alt ,isSelected}) => {
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });

  const handleResize = (e: any) => {
    const { width, height } = e.target.getBoundingClientRect();
    setDimensions({ width, height });
  };
  return (
    <div
      style={!isSelected ? {
        width: dimensions.width,
        height: dimensions.height,
        overflow: "auto",
        border: "0px solid black",
        overflowY: "hidden"
      }: {        width: dimensions.width,
        height: dimensions.height,
        resize: "both",
        overflow: "auto",
        border: "2px solid blue",
        overflowY: "hidden"
      }}
      onResize={(e)=>{if(isSelected){handleResize(e)}}}
    >
      <img
        className="unselectable"
        draggable="false"
        onDragStart={(e: any) => e.preventDefault()}
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

const Palets: React.FC<any> = (props: any) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const context = useContext<any>(contextBox);
  const [coverImg, setCoverImg] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    if (props.coverImage) {
      const imageUrl = props.coverImage.replace(/\\/g, "/");
      setCoverImg(imageUrl);
    }
  }, [props.coverImage]);
  function clickHandler() {
    setIsDragging(true);
  }
  function MoveHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { clientX, clientY } = event;
    let isDrawOn = isDragging && clientY > 0 + Number(context.brushSize);
    if (isDrawOn && context.selectedTool === "brush") {
      context.setCircles((prevCircles: any) => [
        ...prevCircles,
        {
          x: clientX,
          y: clientY,
          id: Math.random().toString(),
          color: context.selectedColor,
          size: context.brushSize,
          reduce: "50%",
        },
      ]);
    }
    if (isDrawOn && context.selectedTool === "eraser") {
      context.setCircles((prevCircles: any) => [
        ...prevCircles,
        {
          x: clientX,
          y: clientY,
          reduce: "0",
          id: Math.random().toString(),
          color: "#fff",
          size: context.brushSize,
          zIndex: "-10",
        },
      ]);
    }
  }
  const printRef = useRef<any>();
  const handleCaptureClick = () => {
    domtoimage
      .toPng(printRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "screenshot.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error capturing image:", error);
      });
  };
  function upHandler() {
    setIsDragging(false);
  }
  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    await handleFileUpload(selectedFile);
  };

  const handleFileUpload = async (selectedFile: any) => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("images", selectedFile);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/imageUpload/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Record<string, string> = await response.json();
      setImages((prev) => [
        ...prev,
        {
          image: data.images,
          selected: true,
          isDrag: false,
          id: Math.random().toString(),
          X: 20,
          Y: 30,
        },
      ]);
    } catch (err) {}
  };
  function MoveImages(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    selected: boolean,
    id: string
  ) {
    if (selected) {
      setIsDragging(false);
    }
    if (selected === true) {
      const imagesCopy = [...images];
      const imageSelectedToMove: IImage | undefined = imagesCopy.find(
        (img) => img.id === id
      );
      const { clientX, clientY } = event;
      if (imageSelectedToMove) {
        imageSelectedToMove.X = clientX;
        imageSelectedToMove.Y = clientY;
        setImages(imagesCopy);
      }
    }
  }

  // eslint-disable-next-line react/display-name
  return (
    <div>
      <div className="paletsContainer" ref={printRef}>
        <div
          className="palets"
          style={{
            backgroundImage: `url(${process.env.REACT_APP_API_BASE_URL}/${coverImg})`,
          }}
          onMouseUp={upHandler}
          onMouseDown={clickHandler}
          onMouseMove={(e) => MoveHandler(e)}
        >
          {images.map((src) => (
            <div
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
              }}
              onDoubleClick={() => {
                src.selected = !src.selected;
              }}
              onMouseUp={() => {
                if (src.selected) {
                  src.isDrag = false;
                }
              }}
              onMouseDown={() => {
                if (src.selected) {
                  src.isDrag = true;
                }
              }}
              onMouseMove={(e) => MoveImages(e, src.isDrag, src.id)}
            >
              <ResizableImage
                src={`${process.env.REACT_APP_API_BASE_URL}/${src.image}`}
                isSelected={src.selected}
                alt="Resizable"
              />
            </div>
          ))}
          {context.circles.map((circle: any) => (
            <div
              key={circle.id}
              style={{
                position: "absolute",
                left:
                  circle.x -
                  (circle.size > 20 ? circle.size - 15 : circle.size),
                top:
                  circle.y -
                  (circle.size > 20 ? circle.size - 15 : circle.size),
                backgroundColor: circle.color,
                borderRadius: circle.reduce,
                width: `${circle.size}px`,
                height: `${circle.size}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <button onClick={handleCaptureClick}>Capture as Image</button>
      <input type="file" onChange={(e) => handleFileChange(e)} />
    </div>
  );
};

export default Palets;
