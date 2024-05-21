import React, { useEffect, useState } from "react";
import "./aksList.css";
import { useNavigate } from "react-router-dom";
import IproductData from './interface'
export default function AksLists() {
  const navigate = useNavigate();
  function moveEditImage(id: String) {
    navigate(`/editImage/${id}`);
  }
  const [products,setProducts] = useState<Array<IproductData>>([])
  useEffect(() => {
    console.log('adf')
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/getAll`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      
    
  }, []);

  return (
    <div className="AksContainer">
      <div className="AksBar">
        {products.map(()=>(
        <div className="AksBox" onClick={() => moveEditImage("123")}>
          <img className="AksImage" src="/test.jpg" alt="" />
          <p className="AksTitle">پاکت</p>
        </div>
        ))}
      </div>
    </div>
  );
}
