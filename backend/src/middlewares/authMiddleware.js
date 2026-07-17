import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Get user
      const user = await userModel.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      next();
    } catch (err) {
      console.log("JWT Error:", err);
      return res.status(401).json("Not authorized, Token failed");
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export const authorize=(...alowedRoles)=>{
   return(req,res,next)=>{
    if(!allowedRoles.includes(req.user.role)){
        return res.status(403).json({message:`Role ${req.user.role} is not authorized for this action`})
    }
    next();
   }
}
