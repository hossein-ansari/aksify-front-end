import React, { useContext, useEffect, useState } from "react";
import { contextBox } from "../../../../_context/context";
import "./categories.css";

const Categories: React.FC = () => {
  const context = useContext<any>(contextBox);
  const [categories, setCategories] = useState<
    Array<{
      id: string;
      category_name: string;
      category_icon: string;
      IsCategory_baseImage: string;
      product_ids: string;
    }>
  >([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL2}/v1/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        data.forEach((cat:{
          id: string;
          category_name: string;
          category_icon: string;
          IsCategory_baseImage: string;
          product_ids: string;
        }) => {
          if (cat.IsCategory_baseImage) {
            setSelectedCategory(cat.id);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function selectCategory(category: string) {
    context.setSelectedCategoryId(category);
  }

  return (
    <div className="Categorys-container">
      {categories?.map((cat) => (
        <div
          key={cat.id}
          className={`iconCategoryBox ${
            selectedCategory === cat.id ? "selected" : ""
          }`}
          style={{
            backgroundImage: `url(${cat.category_icon})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "50px",
            height: "35px",
          }}
          onClick={() => {
            setSelectedCategory(cat.id);
            selectCategory(cat.id);
          }}
        ></div>
      ))}
    </div>
  );
};

export default Categories;
