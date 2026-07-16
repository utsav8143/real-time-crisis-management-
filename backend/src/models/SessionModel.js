import mongoose from "mongoose";

const sessionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User is required"],
        ref:"user"
    },
    refreshTokenHash:{
        type:String,
        required:[true,"Refresh token is required"]
    },
    ip:{
        type:String,
        required:true
    },
    userAgent:{
        type:String,
        required:true
    },
    revoked:{
        type:Boolean,
        default:false
    }
},{
    timestamp:true
})

const sessionmodel=mongoose.model("Session",sessionSchema)

export default sessionmodel;