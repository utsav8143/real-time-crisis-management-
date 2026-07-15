import  Dotenv  from "dotenv"

Dotenv.config();

if(!process.env.PORT){
    throw new Error("PORT not defined in env")
}

if(!process.env.MONGO_URI){
    throw new Error("MONGO URI is not defined in env")
}

if(!process.env.JWT_SECRET_KEY){
    throw new Error("JWT KEY is not defined in env")
}

const config={
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY
}

export default config