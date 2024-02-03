import { Router } from "express";
import { getUsers, login, register } from "../Controllers/AuthController";

export const authRouter = Router();


authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/users", getUsers )