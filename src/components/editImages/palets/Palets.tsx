import React, { useContext, useEffect, useRef, useState } from "react";
import { IImage } from "./interface";
import { IShape } from "./interface";
import "./style.css";
import { contextBox } from "../../../_context/context";
import domtoimage from "dom-to-image";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faUpload,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ResizableImage from "./ResizableImage";
import ResizableShape from "./ResizableShapes";

const Palets: React.FC<any> = (props: any) => {
  const [widthImg, setWidthImg] = useState(100);
  const [heightImg, SetHeightImg] = useState(100);
  const [widthShape, setWidthShape] = useState(100);
  const [heightShape, SetHeightShape] = useState(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const context = useContext<any>(contextBox);
  const [coverImg, setCoverImg] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<IImage[]>([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const printRef = useRef<any>();
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const movementThreshold = 1;
  const navigate = useNavigate();
  useEffect(() => {
    if (props.coverImage) {
      const imageUrl = props.coverImage.replace(/\\/g, "/");
      setCoverImg(imageUrl);
    }
  }, [props.coverImage]);
  function clickHandler(event:any) {
    setIsDragging(true);
    setInitialPosition({ x: event.clientX, y: event.clientY });
  }
  function MoveHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { clientX, clientY } = event;
    const distanceMoved = Math.sqrt(
      Math.pow(clientX - initialPosition.x, 2) + Math.pow(clientY - initialPosition.y, 2)
    );

    if (distanceMoved > movementThreshold) {
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
  }
  function upHandler() {
    setIsDragging(false);
  }
  const handleCaptureClick = () => {
    if (cookies.user.subscriptionType.limitExport >= 1) {
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
      const data = cookies.user;
      data.subscriptionType.limitExport -= 1;
      setCookie("user", data, {
        path: "/",
        expires: new Date(Date.now() + 604800000),
        sameSite: "lax",
        secure: true,
      });
    } else {
      navigate("/subscription");
    }
  };
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
          X: 250,
          Y: 250,
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
  function MoveShapes(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    selected: boolean,
    id: string
  ) {
    if (selected) {
      setIsDragging(false);
    }
    if (selected === true) {
      const shapesCopy = [...context.shapes];
      const shapeSelectedToMove: IShape | undefined = shapesCopy.find(
        (img) => img.id === id
      );
      const { clientX, clientY } = event;
      if (shapeSelectedToMove) {
        shapeSelectedToMove.X = clientX;
        shapeSelectedToMove.Y = clientY;
        context.setShapes(shapesCopy);
      }
    }
  }
  function deleteItem(type: string, id: string) {
    if (type === "image") {
      console.log("ye");
      let imagesCopy = [...images];
      const findImage: any = imagesCopy.findIndex((img) => img.id == id);
      imagesCopy.splice(findImage, 1);
      setImages(imagesCopy);
      console.log(findImage);
    }
    if (type === "shape") {
      let shapesCopy = [...context.shapes];
      const findShape: any = shapesCopy.findIndex((shape) => shape.id == id);
      if (findShape) {
        shapesCopy.splice(findShape, 1);
        context.setShapes(shapesCopy);
      }
    }
  }
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
                  width: "150px",
                  height: "150px",
                  left: src.X - (widthImg > 200 ? widthImg - 100 : 50),
                  top: src.Y - (heightImg > 200 ? heightImg - 100 : 50),
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
                  setDragFalse={() => {
                    src.isDrag = false;
                  }}
                  setWidthImg={setWidthImg}
                  deleteItem={deleteItem}
                  SetHeightImg={SetHeightImg}
                  src={`${process.env.REACT_APP_API_BASE_URL}/${src.image}`}
                  isSelected={src.selected}
                  isDrag={src.isDrag}
                  alt="Resizable"
                />
              </div>
          ))}
          {context.shapes.map((shape: IShape) => (
            <div
              style={{
                position: "absolute",
                width: "150px",
                height: "150px",
                left: shape.X - (widthImg > 200 ? widthImg - 100 : 50),
                top: shape.Y - (heightImg > 200 ? heightImg - 100 : 50),
              }}
              onDoubleClick={() => {
                shape.selected = !shape.selected;
              }}
              onMouseUp={() => {
                if (shape.selected) {
                  shape.isDrag = false;
                }
              }}
              onMouseDown={() => {
                if (shape.selected) {
                  shape.isDrag = true;
                }
              }}
              onMouseMove={(e) => MoveShapes(e, shape.isDrag, shape.id)}
            >
              <ResizableShape
                setDragFalse={() => {
                  shape.isDrag = false;
                }}
                deleteItem={deleteItem}

                setWidthShape={setWidthShape}
                SetHeightShape={SetHeightShape}
                shape={shape.shape}
                color={shape.color}
                isSelected={shape.selected}
                isDrag={shape.isDrag}
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
      <div className="exportAndUploadBox">
        <label className="downloadImgEditPage" onClick={handleCaptureClick}>
          <FontAwesomeIcon icon={faDownload} />
        </label>
        <input
          id="file-input"
          style={{ display: "none" }}
          type="file"
          onChange={(e) => handleFileChange(e)}
        />
        <label className="downloadImgEditPage" htmlFor="file-input">
          <FontAwesomeIcon icon={faUpload} />
        </label>
      </div>
    </div>
  );
};

export default Palets;
