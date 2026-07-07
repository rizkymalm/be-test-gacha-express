import { ClientSession } from 'mongoose';
import authModels from '../models/auth.model.js';

interface PropsAuth {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    session?: ClientSession;
}

export async function authRegister({
    username,
    email,
    password,
    firstName,
    lastName,
    role,
    session,
}: PropsAuth) {
    const newUser = new authModels(
        {
            username,
            email,
            password,
            firstName,
            lastName,
            role,
        },
        { session }
    );

    return await newUser.save();
}

export async function authLogin({ email }: any) {
    const user = authModels.findOne({ email: email });
    return user.exec();
}
