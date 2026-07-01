import authModels from '../models/auth.model.ts';

export async function userProfile({ id }: any) {
    const user = authModels
        .findOne({ _id: id })
        .select('username email firstName lastName role');
    return user.exec();
}
