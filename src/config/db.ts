import 'dotenv/config';
import mongoose from 'mongoose';

let isConnected = false;

export default async function connectDB() {
    try {
        if (isConnected) return;

        const db = await mongoose.connect(process.env.DATABASE_URI!, {
            dbName: 'staging',
            bufferCommands: false,
        });

        isConnected = db.connections[0]?.readyState === 1;
    } catch (error: any) {
        if (error) {
            process.exit(1);
        }
    }
}
