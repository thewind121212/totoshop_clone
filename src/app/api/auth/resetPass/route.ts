import { connectToDatabase } from "@/utils/db/db.utils";
import { resetPasswordTemplate } from "@/utils/node-mailer/mail-template/resetPassword.template";
import { User } from "@/utils/db/modal/index.modal";
import { sendMailHandler } from "@/utils/node-mailer/index";
import jwt from "jsonwebtoken";


const sendVerify = async (name: string, email: string, link: string) => {
  const dataSend = resetPasswordTemplate(name,link);
  const isEmailSent = await sendMailHandler(dataSend, email.toString().trim());
  return isEmailSent;
};

export async function POST(req: Request) {
    await connectToDatabase(); 
    const body = await req.json();
    const host = req.headers.get('host')
    const user = await User.findOne({ email: body.email })
    if (user === null) {
        return new Response(JSON.stringify({ error: "Unauthorized", message: "Email không tồn tại" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
    if (process.env.JWT_SECRET === undefined) throw new Error('JWT_SECRET is not defined')
    const token = jwt.sign({ email: body.email, random: Math.random() }, process.env.JWT_SECRET, { expiresIn: '2d' })
    const link = `http://${host}/reset-password?token=${token}`
    const isSentCheck = await sendVerify(body.name, body.email, link)
    if (isSentCheck === true) {
        await User.updateOne({ email: body.email }, { resetPasswordStatus: true })
        return new Response(JSON.stringify({ message: "Email đã được gửi đi" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
    else {
        return new Response(JSON.stringify({ error: "Error", message: "Internal Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            } 
        })
    }
} 