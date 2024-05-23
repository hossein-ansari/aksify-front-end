import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function LHeader() {
  const [cookies] = useCookies(["user"]);
  return (
    <div className="container">
      <div className="logoBox">
        <img className="logoImage" src="/aksifyLogo.png" alt="" />
      </div>
      <div className="listBox">
        <ul className="listBoxUl">
          <li className="listItem"><Link to="/">فروشگاه عکس</Link></li>
          <li className="listItem"><Link to="/aksshop">فروشگاه عکس</Link></li>
          <li className="listItem"><Link to="/subscription">تعرفه ها</Link></li>
          <li className="listItem"><Link to="/about">درباره ما</Link></li>
          <li className="listItem"><Link to="/contact">تماس با ما</Link></li>
        </ul>
      </div>
      <div className="registerBox">
        <button className="registerBtn">
          {cookies.user !== undefined  ? (
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
