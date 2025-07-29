import { password } from "bun";
import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email address.
 *           unique: true
 *         password:
 *           type: string
 *           description: The user's password.
 */
const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true},
    password: { type: String}
});

const User = mongoose.model("User", UserSchema);
export default User;