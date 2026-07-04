import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI || '', {
            dbName: 'staging',
            bufferCommands: false,
        });
    } catch (error: any) {
        if (error) {
            process.exit(1);
        }
    }
};

export default connectDB;
