import app from "./src/app.js";
import express from "express";
import connectDB from "./src/config/dbConfig.js";
import { Server } from "socket.io";
import {createServer} from "http"

connectDB();


const server=createServer(app)
const io=new Server(server)
const port = process.env.PORT || 3000;



server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});
