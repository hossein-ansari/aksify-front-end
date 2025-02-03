import React, { useContext, useEffect, useState } from "react";
import { contextBox } from "../../../../_context/context";
import "./items.css";

const Items: React.FC = () => {
  const context = useContext<any>(contextBox);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [modalData, setModalData] = useState<null | {
    product_description: string;
    product_name: string;
    product_price: string;
    product_size: string;
    product_stock: string;
    product_image: string;
  }>(null);

  useEffect(() => {
    if (context.selectedCategoryId) {
      fetch(
        `${process.env.REACT_APP_API_BASE_URL2}/v1/category-products/${context.selectedCategoryId}`
      )
        .then((response) => response.json())
        .then((data) => {
          context.setItems(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [context.selectedCategoryId]);

  const handleSelectItem = (Item: {
    product_description: string;
    product_id: string;
    product_image: string;
    product_name: string;
    product_price: string;
    product_size: string;
    product_stock: string;
  }) => {
    setSelectedItem(Item.product_id);
    context.setShapes((prev: any) => [
      ...prev,
      {
        shape: Item,
        selected: true,
        isDrag: false,
        id: Item.product_id,
        X: 150,
        Y: 150,
      },
    ]);
  };

  const handleShowModal = (Item: {
    product_description: string;
    product_name: string;
    product_price: string;
    product_size: string;
    product_stock: string;
    product_image: string;
  }) => {
    setModalData(Item);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <div className="Items-container">
        {context.Items ? (
          context.Items.map((Item: any) => {
            if (Item.product_stock) {
              return (
                <div
                  key={Item.product_id}
                  className="iconItemBox"
                  style={{
                    backgroundImage: `url(${Item.product_image})`,
                  }}
                  onClick={() => handleSelectItem(Item)}
                >
                  <div
                    className="infoIcon"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from selecting the Item
                      handleShowModal(Item);
                    }}
                  >
                    !
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div></div>
        )}
      </div>

      {modalData && (
        <div className="modal-overlay" dir="rtl" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
            <div className="modal-header">
              <img
                src={modalData.product_image}
                alt={modalData.product_name}
                className="modal-image"
              />
              <h3>{modalData.product_name}</h3>
            </div>
            <div className="modal-body">
              <p>
                <strong>وتوضیحات : </strong> {modalData.product_description}
              </p>
              <p>
                <strong>قیمت : </strong>{" "}
                <span className="price">${modalData.product_price}</span>
              </p>
              <p>
                <strong>ابعاد : </strong> {modalData.product_size}
              </p>
              <p>
                <strong>موجودی : </strong>{" "}
                <span
                  className={`stock ${
                    Number(modalData.product_stock) > 0
                      ? "in-stock"
                      : "out-stock"
                  }`}
                >
                  {Number(modalData.product_stock) > 0 ? "موجود" : "ناموجود"}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Items;
