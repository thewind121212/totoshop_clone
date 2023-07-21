"use client";
import Image from "next/image";
import Input from "../../UI/input/Input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./login.styles.module.css";
import { useAppDispatch } from "@/redux/reduxHook";
import { useSession, signIn, signOut } from "next-auth/react";
import { toogleSnackBarDispatch, toogleSnackBar } from "@/redux/Features/UI/snackBar.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";


//redux dispatch type
const dispatchType = {
  'LOGIN_SUCCESS': [{type: 'success', content: 'Đăng nhập thành công'}],
  'LOGIN_FAIL': [{type: 'error', content: 'Email hoặc mật khẩu không đúng'}],
} 

//login table
const loginTable: any = [
  {
    id: "email",
    label: "Email",
    placeholder: "Email",
    type: "text",
  },
  {
    id: "password",
    label: "Mật khẩu",
    placeholder: "Mật khẩu",
    type: "password",
  },
];

//login schema
const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(7),
});

//component
function Login({ changeAuthType }: any) {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session, status);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  //checking when rerender

  const onSubmit = async (data: any) => {
    console.log(JSON.stringify(data));
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error !== null) {
      dispatch(toogleSnackBar(toogleSnackBarDispatch(dispatchType.LOGIN_FAIL)))
      return 
    }
    dispatch(toogleSnackBar(toogleSnackBarDispatch(dispatchType.LOGIN_SUCCESS)))
    router.push('/')
  };

  const handlerGoogleLogin = async () => {
    const res = await signIn("google", {
      redirect: false,
      "callbackUrl": "http://localhost:3000/",})
    console.log(res);
  }

  return (
    <div className="w-full h-auto pt-[10px] px-[30px] pb-[30px]">
      <form
        className={classes.formLogin}
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        {loginTable.map(({ id, label, placeholder, type }: any) => {
          return (
            <Input
              register={register}
              key={id}
              id={id}
              label={label}
              placeholder={placeholder}
              type={type}
              errors={errors}
              formType="login"
            />
          );
        })}
        <div className={classes.forgetPassword}>
          <Link href="/reset-password">Quên mật khẩu? </Link>
        </div>
        <button
          className={`${classes.submit} ${true && classes.submitActive}`}
          type="submit"
        >
          đăng nhập
        </button>
      </form>
      <div className={classes.moreWayLogin}>
        <span
          className={classes.moreWayLoginText}
          onClick={() => {
            signOut();
          }}
        >
          Hoặc
        </span>
      </div>
      <button
        className={classes.submitGoogle}
        onClick={handlerGoogleLogin}
        type="submit"
      >
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
