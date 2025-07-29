import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { PORT } from "./config/env"; // Importing the PORT from env config

connectDB(); // Call the function to connect to the database
dotenv.config();

const app = express();

// === Middleware ===
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
})

// === Routes ===
import auth from "./routes/auth";
app.use("/api/auth", auth);

app.listen(PORT, (): void => {
    console.log(`Server started on port: ${PORT}`);
})