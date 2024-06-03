import React, { useState } from "react";
import "./login.css";
import IformData from "./interface";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [registerOrLogin, setRegisterOrLogin] = useState<String>("register");
  const [cookies, setCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState<IformData>({
    userName: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  function changeLoginMode(newMode: string) {
    setRegisterOrLogin(newMode);
  }

  function loginOrRegister() {
    if (registerOrLogin === "register") {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/create`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setRegisterOrLogin("login");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate('/');
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }
  return (
    <div className="loginBox">
      <div className="loginBtnBar">
        <button
          onClick={() => changeLoginMode("register")}
          className={registerOrLogin === "register" ? "selectedROL" : ""}
        >
          ثبت نام
        </button>
        <button
          onClick={() => changeLoginMode("login")}
          className={registerOrLogin === "login" ? "selectedROL" : ""}
        >
          ورود
        </button>
      </div>
      <div className="loginFormBar">
        {registerOrLogin === "register" ? (
          <form action="submit">
            <input
              value={formData.userName}
              className="loginFormInput"
              placeholder="userName"
              type="text"
              onChange={(e) =>
                setFormData((pre) => ({
                  ...pre,
                  userName: e.target.value,
                }))
              }
            />
            <input
              className="loginFormInput"
              placeholder="password"
              type="password"
              onChange={(e) =>
                setFormData((pre) => ({
                  ...pre,
                  password: e.target.value,
                }))
              }
            />
            <input
              className="loginFormInput"
              placeholder="email"
              type="email"
              onChange={(e) =>
                setFormData((pre) => ({
                  ...pre,
                  email: e.target.value,
                }))
              }
            />
          </form>
        ) : (
          <form action="submit">
            <input
              value={formData.userName}
              className="loginFormInput"
              placeholder="userName"
              type="text"
              onChange={(e) =>
                setFormData((pre) => ({
                  ...pre,
                  userName: e.target.value,
                }))
              }
            />
            <input
              className="loginFormInput"
              placeholder="password"
              type="password"
              onChange={(e) =>
                setFormData((pre) => ({
                  ...pre,
                  password: e.target.value,
                }))
              }
            />
          </form>
        )}
      </div>
      <div className="submitBoxLogin">
        <button onClick={loginOrRegister} className="submitBtnLogin">
          submit
        </button>
      </div>
    </div>
  );
};
export default Login;
