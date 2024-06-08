import React, { useContext, useEffect, useRef, useState } from "react";
import { IImage } from "./interface";
import { IShape } from "./interface";
import "./style.css";
import { contextBox } from "../../../_context/context";
import domtoimage from "dom-to-image";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ResizableImage from "./ResizableImage";
import ResizableShape from "./ResizableShapes";
import { useParams } from "react-router-dom";

const Palets: React.FC<any> = (props: any) => {
  const [widthImg, setWidthImg] = useState(100);
  const [heightImg, SetHeightImg] = useState(100);
  const [widthShape, setWidthShape] = useState(100);
  const [heightShape, SetHeightShape] = useState(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const context = useContext<any>(contextBox);
  const [coverImg, setCoverImg] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [cookies, setCookie] = useCookies(["jwt"]);
  const printRef = useRef<any>();
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const movementThreshold = 5;
  const [distanceMoved, setDistanceMoved] = useState<number>();
  const { id, changeId } = useParams<{ id: string; changeId: string }>();

  const navigate = useNavigate();
  useEffect(() => {
    if (changeId) {
      fetch(
        `${process.env.REACT_APP_API_BASE_URL}/lastChanges/getOneLast/${changeId}`
      )
        .then((response) => response.json())
        .then((data) => {
          context.setImages(data.images);
          context.setCircles(data.circles);
          context.setShapes(data.shapes);
          setTimeout(() => {
            setCoverImg(data.backGroundImage.coverImg)
            
          }, 50);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [changeId]);
  useEffect(() => {
    if (props.coverImage) {
      const imageUrl = props.coverImage.replace(/\\/g, "/");
      setCoverImg(imageUrl);
    }
  }, [props.coverImage]);
  function clickHandler(e: any) {
    setDistanceMoved(0);
    setIsDragging(true);
    setInitialPosition({ x: e.clientX, y: e.clientY });
  }
  function MoveHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { clientX, clientY } = event;
    setDistanceMoved(
      Math.sqrt(
        Math.pow(clientX - initialPosition.x, 2) +
          Math.pow(clientY - initialPosition.y, 2)
      )
    );

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
  function upHandler() {
    setIsDragging(false);
    if (distanceMoved) {
      if (distanceMoved > movementThreshold) {
        let newCircles = [...context.circles];
        let circlesRemoved = [...context.circlesRemoved];
        if (newCircles[0]) {
          let circlesLength = newCircles.length;
          circlesRemoved.push(newCircles[circlesLength - 1]);
          newCircles.pop();
          context.setCircles(newCircles);
          context.setCirclesRemoved(circlesRemoved);
        }
      }
    }
  }
  function handleDecreaseCount() {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/user-data`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(
          `${process.env.REACT_APP_API_BASE_URL}/users/decreaseExport/${data.user.userName}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => console.log(data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  function handleSaveLastChanges() {
    if (cookies.jwt) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/user-data`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const dataForSend = {
            userId: data.user.id,
            images: context.images,
            shapes: context.shapes,
            circles: context.circles,
            backGroundImage: { id: id, coverImg: coverImg },
          };
          if (!changeId) {
            console.log("create");
            fetch(`${process.env.REACT_APP_API_BASE_URL}/lastChanges/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataForSend),
            });
          } else {
            console.log("update");
            fetch(
              `${process.env.REACT_APP_API_BASE_URL}/lastChanges/update/${changeId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dataForSend),
              }
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      navigate("/login");
    }
  }
  const handleCaptureClick = () => {
    if (cookies.jwt) {
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
      handleDecreaseCount();
      handleSaveLastChanges();
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
      context.setImages((prev: any) => [
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
      const imagesCopy = [...context.images];
      const imageSelectedToMove: IImage | undefined = imagesCopy.find(
        (img) => img.id === id
      );
      const { clientX, clientY } = event;
      if (imageSelectedToMove) {
        imageSelectedToMove.X = clientX;
        imageSelectedToMove.Y = clientY;
        context.setImages(imagesCopy);
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
      let imagesCopy = [...context.images];
      const findImage: any = imagesCopy.findIndex((img) => img.id == id);
      imagesCopy.splice(findImage, 1);
      context.setImages(imagesCopy);
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
          {context.images.map((src: any) => (
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
