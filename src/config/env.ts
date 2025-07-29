// src/config/env.ts
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/edutrackr';