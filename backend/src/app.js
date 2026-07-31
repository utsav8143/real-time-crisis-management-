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
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api/auth",authRoute)
app.use("/api/incident",incidentRoute)

export default app;