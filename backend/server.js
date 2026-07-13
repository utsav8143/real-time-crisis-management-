import app from "./src/app.js";
import express from "express";

const port=process.env.PORT || 3000;

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${port}`)
})