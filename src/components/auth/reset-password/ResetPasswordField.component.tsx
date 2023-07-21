"use client";
import { useState } from "react";
import { FcApproval } from "react-icons/fc";
import Input from "@/components/UI/input/Input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toogleSnackBar } from "@/redux/Features/UI/snackBar.slice";
import { useAppDispatch } from "@/redux/reduxHook";

const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(7, "Mật khẩu phải có ít nhất 7 kí tự"),
  retypeNewPassword: yup.string().required("Vui lòng nhập lại mật khẩu"),
});

const resetPasswordTable = [
  {
    id: "newPassword",
    label: "Mật khẩu mới",
    placeholder: "Mật khẩu mới",
    type: "password",
    required: true,
  },
  {
    id: "retypeNewPassword",
    label: "Nhập lại mật khẩu mới",
    placeholder: "Nhập lại mật khẩu mới",
    type: "password",
    required: true,
  },
];

function ResetPasswordField({ token }: any) {
  const [status, setStatus] = useState("idle");
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const handlerResetPassword = async (data: any) => {
    const newPassword = data.newPassword;
    const retypePassword = data.retypeNewPassword;

    if (newPassword !== retypePassword) {
      dispatch(
        toogleSnackBar({
          show: true,
          notificationStack: [
            { type: "error", content: "Mật khẩu không trùng khớp" },
          ],
        })
      );
    } else {
      const rest = await fetch("/api/auth/resetPass/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, token }),
      });

      const restMessage = await rest.json();
      if (rest.status === 200) {
        setStatus("success");
        dispatch(
          toogleSnackBar({
            show: true,
            notificationStack: [
              { type: "success", content: "Thao tác thành công" },
            ],
          })
        );
      } else {
        dispatch(
          toogleSnackBar({
            show: true,
            notificationStack: [
              { type: "error", content: restMessage.message },
            ],
          })
        );
      }
    }
  };


  if (status === "success") {
    return (
    <div className="flex flex-col items-center justify-center h-screen border-gray-200">
      <FcApproval style={{width: '64px', height:"64px"}} />
      <h1 className="text-3xl font-bold mb-2">Thao tác thành công</h1>
      <p className="text-lg">Bạn đã tìm lại mất khẩu thành công vui lòng quay lại và tiền hành đăng nhập</p>
    </div>
    )
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4"> Lấy lại mật khẩu</h1>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(handlerResetPassword)}
      >
        {resetPasswordTable.map(({ id, label, placeholder, type }: any) => (
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
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 focus:outline-none"
          type="submit"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordField;
