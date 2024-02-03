import { RequestHandler } from "express";
import createHttpError from "http-errors";
import AuthModel from "../Model/AuthModel";
import bcryt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
import env from "../util/validateEnv"

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        
        const users = await AuthModel.find().exec();

        if(!users){
            throw createHttpError(500, "server could not fetch the users")
        }


        res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}

export const register: RequestHandler = async (req, res, next) => {

         try {
            
            const email = req.body.email;

            if(!email){
                throw createHttpError(400, "please enter the email !")
            }

           const isEmailPresent = await AuthModel.findOne({email});

           if(isEmailPresent){
               throw createHttpError(400, "sorry this email is already taken")
           }

           const username = req.body.username;

           if(!username){
            throw createHttpError(400, "please enter the username")
           }

           const isUserNamePresent = await AuthModel.findOne({username});

           if(isUserNamePresent){
              throw createHttpError(400, "sorry this username is already taken !")
           }


           const password = req.body.password;

           if(!password){
            throw createHttpError(500, "please enter the password !")
           }

           const hasedPassword = await bcryt.hash(password, 10);


           const newUser = await AuthModel.create({
            email: email,
            username: username,
            password: hasedPassword,
            isAuctioner: false
           })

           if(!newUser){
             throw createHttpError(500, "server could not register a new user at the moment")
           }

        

           res.status(200).json(newUser)



         } catch (error) {
            next(error)
         }
    
}



export const login: RequestHandler = async (req, res, next) => {

    try {
       
       const email = req.body.email;

       if(!email){
           throw createHttpError(400, "please enter the email !")
       }

      const user = await AuthModel.findOne({email});

      if(!user){
          throw createHttpError(400, "no previous user with this email")
      }

      const password = req.body.password;

      if(!password){
       throw createHttpError(500, "please enter the password !")
      }


      const isPasswordValid = await bcryt.compare(password, user.password);

      if(!isPasswordValid){
        throw createHttpError(400, "the given password is invalid !")
      }

      
      const token = jwt.sign({userId: user._id}, env.SecretKey, {expiresIn: "2hr"});

      res.status(200).json({msg: "login successful", token: token});
      

    } catch (error) {
       next(error)
    }

}