import React, { useState } from "react";
import "./login.css";
const Login: React.FC = () => {
  const [registerOrLogin, setRegisterOrLogin] = useState<Boolean>(false);
  return (
    <div className="loginBox">
      <div className="loginBtnBar">
        <button className={registerOrLogin && "selectedROL"}>ثبت نام</button>
        <button className={registerOrLogin && "selectedROL"}>ورود</button>
      </div>
      <div className="loginFormBar">
        <form action="submit">
          <input
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
        <button className="submitBtnLogin">submit</button>
      </div>
    </div>
  );
};
export default Login;
