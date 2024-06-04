import React, { useEffect, useState } from "react";
import "./aksList.css";
import { useNavigate } from "react-router-dom";
import IproductData from "./interface";
const AksLists: React.FC<any> = (itemsSearched) => {
  const navigate = useNavigate();
  function moveEditImage(id: String) {
    navigate(`/editImage/${id}`);
  }
  const [products, setProducts] = useState<Array<IproductData>>([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/getAll`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setProducts(data);
      })
      .catch((error) => { 
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    if (itemsSearched.itemsSearched) {
      setProducts(itemsSearched.itemsSearched);
    }
  }, [itemsSearched]);

  return (
    <div className="AksContainer">
      <div className="AksBar">
        {products.map((product) => (
          <div className="AksBox" onClick={() => moveEditImage(product._id)}>
            <img
              className="AksImage"
              src={`${process.env.REACT_APP_API_BASE_URL}/${product.coverImage}`}
              alt={product.name}
            />
            <p className="AksTitle">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AksLists;
