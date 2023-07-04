"use client";

import { useState } from "react";
import classes from "./auth.styles.module.css";
//components
import Login from "./login/Login.component";
import Register from "./register/Register.component";

function Auth() {
  const [authType, setAuthType] = useState("login");

  //define component to render 
  const loginComponent = <Login changeAuthType={() => setAuthType("register")} />;
  const registerCoponent = <Register changeAuthType={() => setAuthType("login")}  />

  return (
    <div className={classes.auth}>
      <div className={classes.authType}>
        <div
          className={`${classes.authTypeBtn} ${authType === 'login' && classes.authTypeBtnActive}`}
          onClick={() => {
            setAuthType("login");
          }}
        >
          Đăng Nhập
        </div>
        <div
          className={`${classes.authTypeBtn} ${authType === 'register' && classes.authTypeBtnActive}`}
          onClick={() => {
            setAuthType("register");
          }}
        >
          Đăng Ký
        </div>
      </div>
      {authType === "login" ? loginComponent : registerCoponent}
    </div>
  );
}

export default Auth;
