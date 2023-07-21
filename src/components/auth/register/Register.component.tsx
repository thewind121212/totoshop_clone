"use client";
import {useEffect} from "react";
import Input from "../../UI/input/Input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classes from "./register.styles.module.css";
import { useAppDispatch } from "@/redux/reduxHook";
import {
  setSentEmailRegisterStatus,
  setUserEmail,
} from "@/redux/Features/Auth/auth.slice";
import { toogleSnackBar, toogleSnackBarDispatch } from "@/redux/Features/UI/snackBar.slice";
import Link from "next/link";



const dispatchType = {
  "PASSWORD_NOT_MATCH": [{type: 'error', content: 'Mật khẩu nhập lại không trùng khớp'}],
  'REGISTER_SUCCESS': [{type: 'success', content: 'Đăng ký thành công'}],
}

const registerTable  = [
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


const RegisterSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập họ tên'),
  phone: yup.string().required().min(10, 'Số điện thoại không hợp lệ'),
  email: yup.string().email('Email không hợp lệ').required(),
  password: yup.string().required().min(7, 'Mật khẩu phải có ít nhất 7 ký tự'),
  repassword: yup.string().required().min(7, 'Mật khẩu phải ít nhất 7 ký tự'),
});


function Register({ changeAuthType }: any) {
  const router = useRouter();
  //redux
  const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(setSentEmailRegisterStatus(false));
    },[])

  //checking when rerender
  

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });


  //func
  const handerRegister = async (data: any) => {

    //check password match
    if (data.password !== data.repassword) {
      const error = [{
        type: "error",
        content: "Mật khẩu nhập lại không trùng khớp",
      }]
      dispatch(toogleSnackBar(toogleSnackBarDispatch(dispatchType.PASSWORD_NOT_MATCH)));
      return 
    }


    dispatch(setSentEmailRegisterStatus(true));
    dispatch(setUserEmail(data.email));

    const res = await fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
      }),
    });

    const resMessage = await res.json();

    if (res.status === 200) {
      dispatch(toogleSnackBar(toogleSnackBarDispatch(dispatchType.REGISTER_SUCCESS)));
      router.push("/auth/verify");
    } else if (res.status === 401) {
      dispatch(
        toogleSnackBar({
          show: true,
          notificationStack: [{ type: "error", content: resMessage.message }],
        })
      );
      dispatch(setSentEmailRegisterStatus(false));
    }
  };

  return (
    <div className="w-full h-auto pt-[10px] px-[30px] pb-[30px]">
      <form className={classes.formLogin} action="" onSubmit={handleSubmit(handerRegister)}>
        {registerTable.map(({id, label, placeholder, type } : {id: any, label: string, placeholder: string, type: string}) => {
          return (
            <Input
              register={register}
              key={id}
              id={id}
              label={label}
              placeholder={placeholder}
              type={type}
              errors={errors}
              formType="register"
            />
          );
        })}
        <div className={classes.forgetPassword}>
          <Link href="/reset-password">Quên mật khẩu? </Link>
          </div>
        <button
          className={`${classes.submit} ${
            isValid &&
            classes.submitActive
          }`}
          type="submit"
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
