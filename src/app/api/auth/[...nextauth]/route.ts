import NextAuth from "next-auth"
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { googleProvider } from "@/utils/next-auth/google.nextauth";
import { credentialsProvider } from "@/utils/next-auth/credentials.nextauth";

//testing 
import { connectToDatabase } from "@/utils/db/db.utils";
import mongoose from "mongoose";
import { User } from "@/utils/db/modal/index.modal";
import { comparePasswords } from "@/utils/bcrypt/index.bcrypt";


const providers : any[] = [
   GoogleProvider({...googleProvider}),
    Credentials({...credentialsProvider}) 
]

const authOptions : AuthOptions = {
    providers,
    callbacks: {
        jwt({token, user, account}) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user.id
            }
            return token
        },
        session({session, token}) {
            session.user.id = token.id
            return session 
        },

    },
    pages: {
        signIn: "/auth",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRET,
    
}


const handler  = NextAuth(authOptions)

export { handler as GET, handler as POST }