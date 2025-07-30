import { Router } from "express";
import { Request, Response } from "express";
import "../types/express.d.ts";
import upload from "../config/multer";
import authMiddleware from "../middleware/authMiddleware";
import { parseAndStore } from "../services/upload.service";
import Record from "../models/Record";
import deleteFile from "../utils/deleteFile.js";
import { getFailingStudents } from "../controllers/record.js";
    
const router = Router();

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Upload a CSV file and store records
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The CSV file to upload
 *     responses:
 *       200:
 *         description: CSV processed and records stored
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: No CSV file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/", authMiddleware, upload.single("file"), async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if(!file) return res.status(400).json({ error: 'No CSV file uploaded' });

        if (!req.user || !('userId' in req.user)) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const records = await parseAndStore(file.path);

        // Save
        for (const record of records) {
            const newRecord = new Record({
                userId: req.user.userId,
                student_id: record.Student_ID,
                full_name: record.Full_Name,
                level: record.Level,
                semester: record.Semester,
                cgpa: record.CGPA,
                courses: record.courses,
            });
            await newRecord.save();
        }

        // Delete the file after process 
        deleteFile(file.path);
        
        res.status(200).json({ message: "CVS processed", records })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/students/failing:
 *   get:
 *     summary: Get students who are failing
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of failing students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/failing", authMiddleware, getFailingStudents);

export default router;