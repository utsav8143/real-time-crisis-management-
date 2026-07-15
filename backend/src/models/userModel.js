import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role:{type:String,
    enum:["citizen","responder","admin"],
    default:"citizen"
  },
  verified: { type: Boolean, required: false },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
