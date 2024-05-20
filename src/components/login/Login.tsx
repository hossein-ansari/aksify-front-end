import React, { useState } from "react";
import "./login.css";
import IformData from './interface'
const Login: React.FC = () => {
  const [registerOrLogin, setRegisterOrLogin] = useState<String>("register");
  const [fromData, setFromData] = useState<IformData>({
    userName : '',
    password : '',
    email : '',
  });

  function changeLoginMode(newMode: string) {
    setRegisterOrLogin(newMode);
  }

  function loginOrRegister() {
    fetch(`http://localhost:4000/subscriptions/getAll`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
        <form action="submit">
          <input
            value={formData.userName}
            className="loginFormInput"
            placeholder="userName"
            type="text"
          />
          <input
            className="loginFormInput"
            placeholder="password"
            type="password"
          />
          <input className="loginFormInput" placeholder="email" type="text" />
        </form>
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
