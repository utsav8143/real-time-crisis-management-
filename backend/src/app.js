import express from  "express";
import connectDB from "./config/dbConfig.js";

connectDB();
const app=express()

export default app;