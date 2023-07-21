"use client";
import {  useRef, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/reduxHook";
import { toogleSnackBar } from "@/redux/Features/UI/snackBar.slice";


function ResetPassword() {
  const emailRef = useRef<any>('');
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<any>({
    status: 'pending',
    email: ''
  });



  const handlerResetPassword = async() => {
    const email = emailRef.current.value;
    const res = await fetch('/api/auth/resetPass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email}) 
    }) 


    const resStatus = res.status; 
    if (resStatus === 401) {
      dispatch(
        toogleSnackBar({
          show: true,
          notificationStack: [{ type: "error", content: 'Email không tồn tại' }],
        })
      );
    }
    if (resStatus === 200) {
      dispatch(
        toogleSnackBar({
          show: true,
          notificationStack: [{ type: "success", content: 'Email gửi thành công' }],
        })
      );
        setStatus({
          ...status,
          status: 'success',
          email: email
        })
    }
 }

  if(status.status === 'success') return (
    <div className="flex flex-col items-center justify-center h-screen border-gray-200">
      <Image src="/icons/check.png" alt="Checkmark" width={48} height={48} />
      <h1 className="text-3xl font-bold mb-2">Đã gửi mail tìm lại mật khẩu cho bạn</h1>
      <p className="text-lg">Vui vòng kiểm tra mail {status.email} để tiến hành đổi mật khẩu</p>
    </div>
  )

  return (
      <div className="flex flex-col items-center mt-8 w-[25vw] min-w-[30vw] ">
        <h1 className="text-2xl font-bold mb-4">Đặt lại mật khẩu</h1>
        <p className="text-green-500 mb-4">(*) Nhập Email đã đăng ký, một email đổi mật khẩu sẽ được gửi đến cho bạn bạn</p>
        <div className="flex flex-col space-y-4 w-full"
        >
            <div className="flex flex-col ">
          <label className="font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            ref={emailRef}
          />
        </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 focus:outline-none"
            onClick={() => {handlerResetPassword()}}
          >
            Xác Nhận
          </button>
        </div>
      </div>
  );
}

export default ResetPassword;
