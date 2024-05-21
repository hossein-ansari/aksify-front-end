import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function LHeader() {
  const [cookies] = useCookies(["user"]);
  console.log(cookies.user.userName);
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
        <button className="registerBtn">
          {cookies.user.useName !== false ? (
            <Link className="registerBtn" to="/profile">
              <FontAwesomeIcon className="profile-icon" icon={faUser} />
              {cookies.user.userName}
            </Link>
          ) : (
            <Link className="registerBtn" to="/login">
              ورود | ثبت نام{" "}
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}
