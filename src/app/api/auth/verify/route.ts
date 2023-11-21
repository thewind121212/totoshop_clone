import  jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/utils/db/db.utils';
import { PreUserVerifyModal, User} from "@/utils/db/modal/index.modal";

export async function POST(req: Request) {
    await connectToDatabase(); 
    const now : any= new Date()
    const body = await req.json();

    if (process.env.JWT_SECRET === undefined) throw new Error('JWT_SECRET is not defined')
    try {
    const decoded : any = jwt.verify(body.authVerificationToken, process.env.JWT_SECRET)
    const preUser = await PreUserVerifyModal.findOne({ email: decoded.email })
    const user = await User.findOne({ email: decoded.email })
    if (user !== null) {
        return new Response(JSON.stringify({error: "Unauthorized", message: "Tài Khoản của bạn đã được xác thực" }), {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          });
    }
    if (preUser.email  !== body.email) {
        return new Response(JSON.stringify({ error: "Unauthorized", message: "email nhập sai" }), {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          });

    }
    const timeDifference  = now - preUser.updatedAt
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysPassed > 1) {
        return new Response(JSON.stringify({ error: "Unauthorized", message: "Email quá thời hạn xác thực" }), {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          });
    } 
    const retriveData = await  PreUserVerifyModal.findOne({ email: body.email })
    if (decoded.attemp !== retriveData.attemp) {
        return new Response(JSON.stringify({ error: "Unauthorized", message: "Email xác thực không chính xác" }), {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          });
    }else {
        await User.create({
            name: retriveData.name,
            email: retriveData.email,
            password: retriveData.password,
            phone: retriveData.phone,
            attempVerified: retriveData.attemp,
            verified: true,
            resetPasswordStatus: false,
             })
        return new Response(JSON.stringify({ message: "Bạn đã xác thực thành côn" }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          });
    } 

    } catch (error) {
        return new Response(JSON.stringify({ error: "Unauthorized", message: "Email xác thực không chính xác" }), {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
} 