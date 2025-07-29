import mongoose from "mongoose";

function connectDB() {
    mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
}

export { connectDB as connectDB };