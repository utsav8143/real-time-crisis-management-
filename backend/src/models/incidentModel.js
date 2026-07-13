import mongoose from "mongoose"

const incidentSchema=new mongoose.Schema({
    title:String,
    description:String,
    category:String,  //flood, fire etc
    severity:{type:String , enum:["low","medium","high","critical"]},
    location:{
        type:{type:String , default: "point", required:true},
        coordinates:{type:[Number], required:true} // [lng,lat]
    },
    status:{type:String, enum:["reported","verified","in-progress","resolved"], default:"reported"},
    reportedBy:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    aiSummary:String,
    createdAt:{type:Date, deafult:Date.now}

});
incidentSchema.index({location:"2dsphere"})

const incidentModel=mongoose.Model("indcident",incidentSchema)

export default incidentModel