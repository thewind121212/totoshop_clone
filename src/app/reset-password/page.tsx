import React from "react";
import ResetPassword from "../../components/auth/reset-password/ResetPassword.component";
import ResetPasswordField from "@/components/auth/reset-password/ResetPasswordField.component";

function ResetPass({ searchParams }: any) {
  if (searchParams.token === undefined) {

    return (
      <div className="w-full h-[100vh] my-[50px] flex justify-center items-center flex-col">
        <ResetPassword />
      </div>
    );
  }
  else {
    return (
    <div className="w-full h-[100vh] my-[50px] flex justify-center items-center flex-col">
      <ResetPasswordField token={searchParams.token} />
    </div>
    )

  }

}

export default ResetPass;
