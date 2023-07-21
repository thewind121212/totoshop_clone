
import mongoose from "mongoose";

// Create a schema for the folder

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    attempVerified: {
        type: Number,
        required: true,
    },
    verified: {
        type: Boolean, 
        required: true,
    },
    resetPasswordStatus: {
        type: Boolean, 
        required: true,
    }
}, { timestamps: true });



const User =  mongoose.models.user || mongoose.model("user", UserSchema )



export default User