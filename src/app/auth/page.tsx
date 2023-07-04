import React from 'react'
import Auth from '@/components/auth/Auth.component'

function AuthPage() {
  return (
    <div className='w-full h-[100vh] my-[50px] flex justify-center items-center flex-col'>
        <div className="w-[50vw] my-[10px] h-auto justify-center items-center">
            <p className="mb-[0.35em] text-center text-[16px] text-[#07bc0c]">(*) Nếu đã có tài khoản từ website cũ, mời bạn thực hiện đăng ký với số điện thoại đã dùng để Totoday cập nhật lại thông tin nhé!</p>
        </div>
        <Auth/>
    </div>
  )
}

export default AuthPage