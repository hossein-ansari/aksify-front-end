import React, { ReactNode, createContext, useEffect, useState } from "react";
import IImage from "./interface";
const contextBox = createContext<unknown>({});
interface AllDataProviderProps {
  children: ReactNode;
}
const AllDataProvider: React.FC<AllDataProviderProps> = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState<string>("#000");
  const [brushSize, setBrushSize] = useState<string>("5");
  const [selectedTool, setSelectedTool] = useState<string>("brush");

  const [circles, setCircles] = useState<Array<object>>([]);
  const [shapes, setShapes] = useState<Array<object>>([]);
  const [images, setImages] = useState<IImage[]>([]);

  const [circlesRemoved, setCirclesRemoved] = useState<Array<object>>([]);

  return (
    <contextBox.Provider
      value={{
        selectedColor,
        brushSize,
        circlesRemoved,
        selectedTool,
        circles,
        shapes,
        images,
        setImages,
        setShapes,
        setCirclesRemoved,
        setCircles,
        setSelectedTool,
        setBrushSize,
        setSelectedColor,
      }}
    >
      {children}
    </contextBox.Provider>
  );
};
export { AllDataProvider, contextBox };
