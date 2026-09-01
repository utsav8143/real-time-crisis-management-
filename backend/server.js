import app from "./src/app.js";
import express from "express";
import connectDB from "./src/config/dbConfig.js";
import { Server } from "socket.io";
import {createServer} from "http"
import { setupSocket } from "./src/sockets/socketHandler.js";

connectDB();


const server=createServer(app)
const io=new Server(server,{
  cors:{
  origin:"http://localhost:5173",
  methods:["GET","POST"],
  credentials: true
}})
const port = process.env.PORT || 3000;

setupSocket(io);

app.set("io", io);



server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});
