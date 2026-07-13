import  Dotenv  from "dotenv"

Dotenv.config();

if(!process.env.PORT){
    throw new Error("PORT not defined in env")
}

const config={
    PORT:process.env.PORT
}

export default config