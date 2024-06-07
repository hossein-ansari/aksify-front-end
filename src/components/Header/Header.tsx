import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function LHeader() {
  const [userData, setUserData] = useState<any>();
  const [cookies, setCookie] = useCookies(["jwt"]);
  useEffect(() => {
    if (cookies.jwt) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/user-data`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);
  return (
    <div className="container">
      <div className="logoBox">
        <Link to="/">
          <img className="logoImage" src="/aksifyLogo.jpg" alt="" />
        </Link>
      </div>
      <div className="listBox">
        <ul className="listBoxUl">
          {/* <li className="listItem">
            <Link to="/">فروشگاه عکس</Link>
          </li>
          <li className="listItem">
            <Link to="/aksshop">فروشگاه عکس</Link>
          </li> */}
          {/* <li className="listItem">
            <Link to="/subscription">تعرفه ها</Link>
          </li> */}
          {/* <li className="listItem">
            <Link to="/about">درباره ما</Link>
          </li>
          <li className="listItem">
            <Link to="/contact">تماس با ما</Link>
          </li> */}
        </ul>
      </div>
      <div className="registerBox">
        <button className="registerBtn">
          {userData && userData.user !== undefined ? (
            <Link className="registerBtn" to="/profile">
              <FontAwesomeIcon className="profile-icon" icon={faUser} />
              {userData.user.userName}
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
