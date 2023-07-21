import { connectToDatabase } from "@/utils/db/db.utils";
import { hashPassword } from "@/utils/bcrypt/index.bcrypt";
import { User } from "@/utils/db/modal/index.modal";
import jwt, { VerifyErrors, Secret } from "jsonwebtoken";

function verifyToken(token: string, secret: Secret): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error: VerifyErrors | null, decoded: any) => {
      if (error) {
        // Handle verification error
        resolve({
          error: true,
          message: "JWT verification failed",
          decoded: null,
        });
      } else {
        resolve({ error: false, message: "JWT verified", decoded });
      }
    });
  });
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  if (process.env.JWT_SECRET === undefined)
    throw new Error("JWT_SECRET is not defined");
  try {
    const decodeRes = await verifyToken(body.token, process.env.JWT_SECRET);
    if (decodeRes.error) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: "Token không hợp lệ",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      const decode = decodeRes.decoded;
      const user = await User.findOne({ email: decode.email });
      if (user === null) {
        return new Response(
          JSON.stringify({
            error: "Unauthorized",
            message: "Email không tồn tại",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      if (user.resetPasswordStatus === false) {
        return new Response(
          JSON.stringify({
            error: "Unauthorized",
            message: "Bạn đã thực hiện tao tác đổi mật khẩu rồi  ",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      const newPassword = await hashPassword(body.newPassword);
      await User.updateOne(
        { email: decode.email },
        { password: newPassword, resetPasswordStatus: false }
      );
      return new Response(
        JSON.stringify({ message: "Đổi mật khẩu thành công" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unauthorized", message: "internal Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
