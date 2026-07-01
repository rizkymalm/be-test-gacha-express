import express from "express";
import { authGet, postRegister } from "../controllers/auth.controller.ts";

const authRouter = express.Router();

authRouter.get("/", authGet);
authRouter.post("/register", postRegister);

export default authRouter;