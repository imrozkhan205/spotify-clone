import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    console.log("Attempting to connect with URI:", uri ? "URI exists" : "URI is undefined");
    
    if (!uri) {
        console.error("MONGODB_URI environment variable is not defined!");
        console.log("Available environment variables:", Object.keys(process.env));
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(uri);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}