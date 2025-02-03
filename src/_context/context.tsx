import React, { ReactNode, createContext, useEffect, useState } from "react";
import IImage from "./interface";
import IItems from "./interface";
const contextBox = createContext<unknown>({});
interface AllDataProviderProps {
  children: ReactNode;
}
const AllDataProvider: React.FC<AllDataProviderProps> = ({ children }) => {
  const [shapes, setShapes] = useState<Array<object>>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<Number>();
  const [Items, setItems] = useState<Array<IItems>>([]);
  return (
    <contextBox.Provider
      value={{
        shapes,
        Items,
        selectedCategoryId,
setSelectedCategoryId,
        setShapes,
        setItems,
      }}
    >
      {children}
    </contextBox.Provider>
  );
};
export { AllDataProvider, contextBox };
