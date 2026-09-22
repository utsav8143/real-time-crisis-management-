import express from  "express";
import morgan from "morgan";
import authRoute from "./routes/authroute.js";
import incidentRoute from "./routes/incidentRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app=express()

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://resq-5lul.onrender.com",
    methods:['GET','POST', 'PATCH'],
    credentials:true,
}));




app.use("/api/auth",authRoute)
app.use("/api/incident",incidentRoute)

export default app;