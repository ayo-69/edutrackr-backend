import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { PORT } from "./config/env"; // Importing the PORT from env config
import { setupSwagger } from "./config/swagger";

connectDB(); // Call the function to connect to the database
dotenv.config();

const app = express();

// == Documentaion ===
setupSwagger(app);
console.log(`Swagger documentation is set up. Running on http://localhost:${PORT}/api/docs`);

// === Middleware ===
app.use(express.json());
app.use(morgan("tiny"));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a hello world message
 *     tags: [Default]
 *     responses:
 *       200:
 *         description: A hello world message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World
 */
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
})


// === Routes ===
import auth from "./routes/auth";
import record from "./routes/record"; // Importing the record route

app.use("/api/auth", auth);
app.use("/api/records", record); // Importing the record route

app.listen(PORT, (): void => {
    console.log(`Server started on port: ${PORT}`);
})