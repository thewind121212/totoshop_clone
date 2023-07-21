import { connectToDatabase } from "../db/db.utils";
import mongoose from "mongoose";
import { User } from "../db/modal/index.modal";
import { comparePasswords } from "../bcrypt/index.bcrypt";

export const credentialsProvider: any = {
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text", placeholder: "your email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials: any, req: any) {
    await connectToDatabase();
    const { email, password } = await req.body;

    const retriveUser = await User.findOne({ email: email });
    if (retriveUser === null) {
      await mongoose.connection.close();
      return null;
    }
    const isPasswordMatch = await comparePasswords(
      password,
      retriveUser.password
    );
    if (!isPasswordMatch) {
      console.log('loio')
      await mongoose.connection.close();
      return null;
    }

    await mongoose.connection.close();
    const result = {
      id: retriveUser._id.toString(),
      email: retriveUser.email,
    };
    return result;
  },
};
