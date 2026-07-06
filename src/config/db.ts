import 'dotenv/config';
import mongoose from 'mongoose';

// Menggunakan global agar koneksi bisa di-reuse antar request
// di dalam environment yang sama (caching)
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbName: 'staging',
            bufferCommands: true, // Ubah ke true agar Mongoose mengantre perintah
        };

        cached.promise = mongoose
            .connect(process.env.DATABASE_URI!, opts)
            .then(mongoose => {
                return mongoose;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}
