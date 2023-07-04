import mongoose from "mongoose";


const URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/shop?retryWrites=true&w=majority`;


export const connectToDatabase = async () => {
    console.log(process.env.MONGODB_USER)
  try {
    return await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
  }
};


