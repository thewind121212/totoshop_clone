"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InputForm from "../../UI/input-form/InputForm.component";
import classes from "./register.styles.module.css";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxHook";
import {
  setSentEmailRegisterStatus,
  setUserEmail,
} from "@/app/redux/Features/Auth/auth.slice";
import { toogleSnackBar } from "@/app/redux/Features/UI/snackBar.slice";

const registerTable = [
  {
    id: "name",
    label: "Họ tên",
    placeholder: "Họ tên",
    type: "text",
    required: true,
  },
  {
    id: "phone",
    label: "Số điện thoại",
    placeholder: "Số điện thoại",
    type: "text",
    required: true,
  },
  {
    id: "email",
    label: "Địa chi email",
    placeholder: "Địa chi email",
    type: "email",
    required: true,
  },
  {
    id: "password",
    label: "Mật khẩu",
    placeholder: "Mật khẩu",
    type: "password",
    required: true,
  },
  {
    id: "repassword",
    label: "Nhập lại mật khẩu",
    placeholder: "Nhập lại mật khẩu",
    type: "password",
    required: true,
  },
];

const initialFormState = {
  name: "",
  phone: "",
  email: "",
  password: "",
  repassword: "",
};

function Register({ changeAuthType }: any) {
  //react core
  const [valid, setValid] = useState<any>(initialFormState);
  //next
  const router = useRouter();
  //redux
  const dispatch = useAppDispatch();
  const { isSentEmailRegister } = useAppSelector(
    (state) => state.registerStatus
  );

    useEffect(() => {
      dispatch(setSentEmailRegisterStatus(false));
    },[])

  //checking when rerender

  const isValidation = Object.values(valid)
    .map((item: any) => item.length > 0)
    .reduce((a: any, b: any) => a + b, 0);

  //func
  const checkValid = (field: string, value: string) => {
    setValid({
      ...valid,
      [field]: value,
    });
  };

  const handerRegister = async (event: FormEvent) => {
    event.preventDefault();
    const errorStack = [];
    const patternUserName = /^[a-zA-Z0-9_\-]{3,16}$/;
    const patternEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //check valid phone
    if (valid.phone.length < 10) {
      errorStack.push({ type: "error", content: "Số điện thoại không hợp lệ" });
    }
    //check valid email

    if (!patternEmail.test(valid.email)) {
      errorStack.push({ type: "error", content: "Email không hợp lệ" });
    }

    //check valid userName
    if (!patternUserName.test(valid.name)) {
      errorStack.push({ type: "error", content: "Tên đăng nhập không hợp lệ" });
    }

    //check password match
    if (valid.password !== valid.repassword) {
      errorStack.push({
        type: "error",
        content: "Mật khẩu nhập lại không trùng khớp",
      });
    }

    //check password length
    if (valid.password.length < 7) {
      errorStack.push({
        type: "error",
        content: "Mật khẩu phải có hơn 7 ký tự",
      });
    }


    if (errorStack.length > 0) {
      dispatch(
        toogleSnackBar({
          show: true,
          notificationStack: errorStack,
        })
      );
      return;
    }

    const form = new FormData(event.target as HTMLFormElement);
    dispatch(setSentEmailRegisterStatus(true));
    dispatch(setUserEmail(form.get("email") as string));

    const res = await fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const { isSentCheck } = await res.json();

    if (isSentCheck) {
      dispatch(
        toogleSnackBar({
          show: true,
          notificationStack: [
            { type: "success", content: "Đăng ký thành công vui lòng kiếm tra mail để kích hoạt tài khoản" },
          ],
        })
      );
      router.push("/auth/verify");
    } else {
      dispatch(
        toogleSnackBar({
          show: true,
          notificationStack: [{ type: "error", content: "Đăng ký thất bại vui lòng thử lại" }],
        })
      );
      dispatch(setSentEmailRegisterStatus(false));
    }
  };

  return (
    <div className="w-full h-auto pt-[10px] px-[30px] pb-[30px]">
      <form className={classes.formLogin} action="" onSubmit={handerRegister}>
        {registerTable.map((item) => {
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
            isValidation === registerTable.length &&
            !isSentEmailRegister &&
            classes.submitActive
          }`}
          type="submit"
          disabled={
            !(isValidation === registerTable.length) && !isSentEmailRegister
          }
        >
          đăng ký
        </button>
      </form>
      <div className={classes.moreWayLogin}>
        <span className={classes.moreWayLoginText}>Hoặc</span>
      </div>
      <button className={classes.submitGoogle} type="submit">
        <Image alt="google" src="/icons/google.webp" width={20} height={21} />
        <div className="">GOOGLE</div>
      </button>
      <div className={classes.policy}>
        <div className={classes.policyText}>
          Bằng việc đăng ký, bạn đã đồng ý với TOTODAY về
        </div>
        <div className={classes.policyText}>
          <span className="text-[#2f80ed]">Điều khoản dịch vụ</span> &{" "}
          <span className="text-[#2f80ed]">Chính sách bảo mật</span>
        </div>
      </div>
      <div className={classes.switchAuth}>
        <span className={classes.switchAuthText}>Bạn đã có tài khoản?</span>
        <span
          className={classes.switchAuthTextColor}
          onClick={() => changeAuthType()}
        >
          Đăng nhập
        </span>
      </div>
    </div>
  );
}

export default Register;
