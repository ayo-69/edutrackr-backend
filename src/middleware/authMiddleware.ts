// == Auth Middleware ==
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/env';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET as string);
        req.user = decoded; // Assuming you have a user property in the Request interface
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(400).json({ message: "Invalid token" });
    }
}