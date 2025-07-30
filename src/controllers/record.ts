import { Request, Response } from "express";
import Record from "../models/Record";
import "../types/express.d.ts";

const getFailingStudents = async (req: Request, res: Response) => {
    try {
        const failingStudents = await Record.find({ userId: req.user.userId, cgpa: { $lt: 2.0 } });
        res.status(200).json(failingStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export { getFailingStudents };