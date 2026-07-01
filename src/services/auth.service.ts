import authModels from "../models/auth.model.ts";

interface PropsAuth {
    username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string
}

// services/authService.ts
export async function authRegister({
  username,
  email,
  password,
  firstName,
  lastName,
  role
}: PropsAuth) {
  const newUser = new authModels({
    username,
    email,
    password,
    firstName,
    lastName,
    role
  });

  return await newUser.save();
}