import React, { useContext, useEffect, useRef, useState } from "react";
import { IImage } from "./interface";
import { IShape } from "./interface";
import "./style.css";
import { contextBox } from "../../../_context/context";
import domtoimage from "dom-to-image";
import "react-resizable/css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";

import { useCookies } from "react-cookie";
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

  useEffect(() => {
    if (props.coverProduct) {
      const imageUrl = props.coverProduct.product_image;
      setCoverImg(imageUrl);
    }
  }, [props.coverProduct]);
  function clickHandler(e: any) {
    setDistanceMoved(0);
    setIsDragging(true);
    setInitialPosition({ x: e.clientX, y: e.clientY });
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
      const shapeSelectedToMove = shapesCopy.find((shape) => shape.id === id);
      const { clientX, clientY } = event;
      if (shapeSelectedToMove) {
        shapeSelectedToMove.X = clientX;
        shapeSelectedToMove.Y = clientY;
        context.setShapes(shapesCopy);
      }
    }
  }
  function deleteItem(id: string) {
    let shapesCopy = [...context.shapes];
    const findShape: number = shapesCopy.findIndex((shape) => shape.id == id);
    if (findShape != undefined) {
      shapesCopy.splice(findShape, 1);
      context.setShapes(shapesCopy);
    }
  }
  return (
    <div>
      <div className="paletsContainer" ref={printRef}>
        <div
          className="palets"
          style={{
            backgroundImage: `url(${coverImg})`,
          }}
          onMouseDown={clickHandler}
        >
          {context.shapes.map((shape: IShape) => (
            <div
              key={shape.id}
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
                shape={shape.shape}
                isSelected={shape.selected}
                isDrag={shape.isDrag}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Palets;
