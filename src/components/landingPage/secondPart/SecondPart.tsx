import React from "react";
import "./SecondPart.css";
import moneyImage from "./images/money.jpg";
import scaleImage from "./images/scale.jpg";
import bestImage from "./images/best.jpg";


export default function SecondPart() {
  const dataBoxes = [
    {
      imgSrc: moneyImage,
      title: "بصرفه در زمان و هزینه",
      description:
        "ممکنه که برای شروع محصولات خود محتوای مناسبی برای ارائه نداشته باشید که این موضوع با عکسیفای حل شدست",
    },
    {
      imgSrc: scaleImage,
      title: "وسعت پذیری",
      description:
       " قابلیت سفارشی سازی  مجصولات و وسعت پذیری بیشتر در زمان کمتر و در نتیجه بازاریابی بهتر و فروش بیشتر",
    },
    {
      imgSrc: bestImage,
      title: "بهترین انتخاب",
      description:
      "سرعت بالا در انتخاب و سفارش سازی محصولات با تنوع و کیفیت بالا در عین هزینه کاملا مقرون به صرفه"
    },  
  ];
  return (
    <div className="dataBoxContainer">
      {dataBoxes.map((items) => (
        <div className="dataBox">
          <img className="imgDataBox" src={items.imgSrc} alt="" />
          <h3 className="h3DataBox">{items.title}</h3>
          <p className="pDataBox">{items.description}</p>
        </div>
      ))}
    </div>
  );
}
