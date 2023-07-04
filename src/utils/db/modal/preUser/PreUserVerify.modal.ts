import mongoose from "mongoose";

// Create a schema for the folder

const Schema = new mongoose.Schema({
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
    attemp: {
        type: Number,
        required: true,
    }
}, { timestamps: true });



const PreUser =  mongoose.models.preUser || mongoose.model("preUser", Schema )



export default PreUser