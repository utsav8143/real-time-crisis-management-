import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database")
    } catch(err){
        console.log("Error connecting to database")
    }
    
}
export default connectDB