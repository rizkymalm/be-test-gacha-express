import authModels from '../models/auth.model.ts';

interface PropsAuth {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}

export async function authRegister({
    username,
    email,
    password,
    firstName,
    lastName,
    role,
}: PropsAuth) {
    const newUser = new authModels({
        username,
        email,
        password,
        firstName,
        lastName,
        role,
    });

    return await newUser.save();
}

export async function authLogin({ email }: any) {
    const user = authModels.findOne({ email: email });
    return user.exec();
}
