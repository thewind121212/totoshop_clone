import { connectToDatabase } from "@/utils/db/db.utils";
import { PreUserVerifyModal, User } from "@/utils/db/modal/index.modal";
import { sendMailHandler } from "@/utils/node-mailer";
import { verifyUserTemplate } from "@/utils/node-mailer/mail-template/verifyUser.template";
import { hashPassword } from "@/utils/bcrypt/index.bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const sendVerify = async (name: string, email: string, link: string) => {
  const dataSend = verifyUserTemplate(name, email, link);
  const isEmailSent = await sendMailHandler(dataSend, email.toString().trim());
  return isEmailSent;
};

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const now: any = new Date();
  const email = body.email;
  const phone = body.phone;
  const userVefifiedEmail = await User.findOne({ email: email });
  const userVefifiedPhone = await User.findOne({ phone: phone });
  if (userVefifiedEmail !== null || userVefifiedPhone !== null) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
        message: "Email hoặc số điện thoại này đã được sử dụng",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  let isSentCheck = null;
  if (process.env.JWT_SECRET === undefined)
    throw new Error("JWT_SECRET is not defined");
  let hashedPassword = body.password;
  if (body.password !== undefined) {
    hashedPassword = await hashPassword(body.password);
  }
  if (body.password === undefined) {
    const modalFound = await PreUserVerifyModal.findOne({ email: email });
    hashedPassword = modalFound.password;
  }

  try {
    const modalFound = await PreUserVerifyModal.findOne({ email: email });
    if (modalFound === null) {
      const newPreUserVerify = new PreUserVerifyModal({
        ...body,
        attemp: 1,
        password: hashedPassword,
      });
      isSentCheck = true;
      await newPreUserVerify.save();
      const createJwtToken = jwt.sign(
        { email: body.email, now: now, attemp: 1 },
        process.env.JWT_SECRET
      );
      const emailLink = `http://${req.headers.get(
        "host"
      )}/auth/verify/${createJwtToken.replaceAll(".", "/")}`;
      isSentCheck = await sendVerify(body.name, body.email, emailLink);
    } else {
      const timeRequest = Math.floor((now - modalFound.updatedAt) / 1000);
      if (timeRequest < 50) {
        return new Response(
          JSON.stringify({
            error: "Vui lòng đợi 60 giây trước khi gửi lại email xác thực",
            message: "Vui lòng đợi 60 giây trước khi gửi lại email xác thực",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      if (timeRequest > 50) {
        const attempVerify = modalFound.attemp  !== null ? modalFound.attemp + 1 : 1;
        await PreUserVerifyModal.updateOne({
          ...body,
          password: hashedPassword,
          attemp: attempVerify,
        });
        const createJwtToken = jwt.sign(
          { email: body.email, now: now, attemp: attempVerify },
          process.env.JWT_SECRET
        );
        const emailLink = `http://${req.headers.get(
          "host"
        )}/auth/verify/${createJwtToken.replaceAll(".", "/")}`;
        isSentCheck = await sendVerify(body.name, body.email, emailLink);
      }
    }
    mongoose.connection.close();
  } catch (error) {
    mongoose.connection.close();
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (isSentCheck) {
    return new Response(
      JSON.stringify({ isSentCheck: true, redirectAppove: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(JSON.stringify({ error: "something went wrong" }), {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
