"use client";
import { useState } from "react";
import Image from "next/image";
import InputForm from "../../UI/input-form/InputForm.component";
import classes from "./login.styles.module.css";
import { useAppDispatch } from "@/app/redux/reduxHook";

const loginTable = [
  {
    id: "user",
    label: "Số điện thoại",
    placeholder: "Số điện thoại",
    type: "text",
    required: true,
  },
  {
    id: "password",
    label: "Mật khẩu",
    placeholder: "Mật khẩu",
    type: "password",
    required: true,
  },
];

const initialFormState = {
    user: false,
    password: false,
}


function Login({ changeAuthType }: any) {
  const [valid, setValid] = useState<any>(initialFormState);
  const dispatch = useAppDispatch();
  //checking when rerender

    const isValidation = valid.user.length > 0 && valid.password.length > 0; 

  //func
  const checkValid = (field: string, value: string) => {
    setValid({
      ...valid,
      [field]: value,
    });
  };



  return (
    <div className="w-full h-auto pt-[10px] px-[30px] pb-[30px]">
      <form className={classes.formLogin} action="">
        {loginTable.map((item) => {
          return (
            <InputForm
              key={item.id}
              id={item.id}
              label={item.label}
              placeholder={item.placeholder}
              checkValid={checkValid}
              type={item.type}
              required={item.required}
            />
          );
        })}
        <div className={classes.forgetPassword}>Quên mật khẩu?</div>
        <button
          className={`${classes.submit} ${
            isValidation && classes.submitActive
          }`}
          type="submit"
          disabled={!isValidation}
        >
          đăng nhập
        </button>
      </form>
      <div className={classes.moreWayLogin}>
        <span className={classes.moreWayLoginText}>Hoặc</span>
      </div>
      <button className={classes.submitGoogle} type="submit">
        <Image alt="google" src="/icons/google.webp" width={20} height={21} />
        <div className="">GOOGLE</div>
      </button>
      <div className={classes.switchAuth}>
        <span className={classes.switchAuthText}>
          Bạn mới biết đến TOTODAY?
        </span>
        <span
          className={classes.switchAuthTextColor}
          onClick={() => changeAuthType()}
        >
          Đăng ký
        </span>
      </div>
    </div>
  );
}

export default Login;
