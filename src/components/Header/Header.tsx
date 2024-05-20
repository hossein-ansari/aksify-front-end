import React from "react";
import './style.css'
export default function LHeader() {
  return (
    <div className="container">
      <div className="logoBox">
        <img className="logoImage" src="/aksifyLogo.png" alt="" />
      </div>
      <div className="listBox">
        <ul className="listBoxUl">
          <li className="listItem">خانه</li>
          <li className="listItem">کارخانه عکس</li>
          <li className="listItem">تعرفه ها</li>
          <li className="listItem">درباره</li>
          <li className="listItem">تماس با ما</li>
        </ul>
      </div>
      <div className="registerBox">
        <button className="registerBtn">ورود | ثبت نام</button>
      </div>
    </div>
  );
}
