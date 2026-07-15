import express from  "express";
import morgan from "morgan";
import authRoute from "./routes/authroute.js";
import incidentRoute from "./routes/incidentRoute.js";

const app=express()

app.use(morgan('dev'));
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/incident",incidentRoute)

export default app;