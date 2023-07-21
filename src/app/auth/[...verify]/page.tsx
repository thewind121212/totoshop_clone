"use client";
import { useParams } from "next/navigation";
import Reverify from "@/components/auth/reverify/Reveify.component";
import { useAppSelector } from "@/redux/reduxHook";
import VerifyEmailPage from "@/components/auth/verifying-email/VerifyingEmail.component";

function VerifyPage() {
  const params = useParams();
  //redux
  const state = useAppSelector((state) => state.registerStatus);
  if (
    !state.isLogin &&
    !state.isSentEmailRegister &&
    params.verify === "verify"
  ) {
    throw Error("Bạn đã đăng nhập và đã xác thực email rồi");
  }
  const paramSlice = params.verify.replace("verify", "").replaceAll("/", ".").replace('.', '');

  

  if (params.verify === "verify") {
    return <Reverify />;
  }else if ((paramSlice.match(/\./g) || []).length === 2) {
    return <VerifyEmailPage paramJWT={paramSlice}/>
  }
  else {
    throw Error("Đường dẫn không hợp lệ");
  }


  

}
export default VerifyPage;
