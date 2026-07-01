import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { authRegister } from "../services/auth.service.ts";

export async function authGet(req: Request, res: Response) {
  try {
    res.json({
      message: "auth routes success",
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
}

export async function postRegister(req: Request, res: Response) {
  try {
    const { username, password, email, firstName, lastName, role } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const save = await authRegister({
      username,
      email,
      password: hashedPass,
      firstName,
      lastName,
      role
    });

    res.json({
      message: "save user success",
      data: save
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message || "An error occurred during registration",
    });
  }
}
