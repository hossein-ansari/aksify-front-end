import React, { useContext, useEffect, useState } from "react";
import Palets from "../../components/editImages/palets/Palets";
import Header from "../../components/editImages/header/Header";
import "./editPage.css";
import { useParams } from "react-router-dom";
import { contextBox } from "../../_context/context";

const EditPage: React.FC<any> = (props: any) => {
  const context = useContext<any>(contextBox);
  const [productBase, setProductBase] = useState<Array<{
    product_id: string;
    product_name: string;
    product_price: string;
    product_image: string;
    product_stock: string;
    product_description: string;
    product_size: string;
}>>([]);
  const [coverProduct, setCoverProduct] = useState<object>({});
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL2}/v1/baseImages`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.category.id)
        setProductBase(data.products);
        setCoverProduct(data.products[0]);
        context.setSelectedCategoryId(data.category.id)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  function changeCover(product: object):void{
    setCoverProduct(product);
  }
  return (
    <div className="editPage">
      <div className="EditBarPalet">
        <Palets coverProduct={coverProduct} />
        <Header />
      </div>
    </div>
  );
};

export default EditPage;
