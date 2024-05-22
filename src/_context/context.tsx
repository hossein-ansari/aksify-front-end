
import React, { ReactNode, createContext, useEffect, useState } from "react";
const contextBox = createContext<unknown>({});
interface AllDataProviderProps {
  children: ReactNode;
}
const AllDataProvider: React.FC<AllDataProviderProps> = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState<string>("#000");
  const [brushSize, setBrushSize] = useState<string>("5");
  const [selectedTool, setSelectedTool] = useState<string>("brush");

  return (
    <contextBox.Provider
      value={{
        selectedColor,
        brushSize,
        selectedTool,
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