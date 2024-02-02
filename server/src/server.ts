import { app } from "./app";
import mongoose from "mongoose";
import "dotenv/config"
import env from "./util/validateEnv"


const port = env.Port;

async function connectMongoDB() {
    try {

       await mongoose.connect(env.Mongo)

       app.listen(port, ()=>{
        console.log("the server is successfully connected to the database and started on port  "+port)
       })
        
    } catch (error) {
        console.error(error)
    }
}


connectMongoDB();


