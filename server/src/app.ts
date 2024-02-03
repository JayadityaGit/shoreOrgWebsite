
import express, { NextFunction, Request, Response } from "express"
import createHttpError, {isHttpError} from "http-errors";
import morgan from "morgan";
import { router } from "./Routes/AuctionRoutes";
import cors from "cors"
import { authRouter } from "./Routes/AuthRoutes";

export const app = express();


app.use(morgan("dev"))
app.use(express.json())
app.use(cors())
app.use("/", router)
app.use("/auth", authRouter)



// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req, res, next)=>{
    
   throw createHttpError(404, "The path does does not exist.")
      
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{
    console.error(error);

    let errorMessage = "check your internet connenction, or an unknown error occured !!!!"

    let statusCode = 500;

    if(isHttpError(error)){
        errorMessage = error.message;
        statusCode = error.status;
    }


    res.status(statusCode).json({error: errorMessage});
})