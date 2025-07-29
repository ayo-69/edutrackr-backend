import { Response, Request} from "express";
import User from "../models/User"; // Assuming you have a User model defined
import { registerSchema, loginSchema } from "../utils/validation"; // Importing the validation schema
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/env';

const registerHandler = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const result = registerSchema.validate({
        name: username,
        email,
        password
    });

    if (result.error) {
        return res.status(400).json({ message: result.error.message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully", user: user });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = loginSchema.validate({
        email,
        password
    });

    if (result.error) {
        return res.status(400).json({ message: result.error.message });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            name: user.name
        },
            JWT_SECRET as string,
            { expiresIn: "1h" }
    );

    res.status(200).json({
        token
    });

}

const protectRoute = (req: Request, res: Response) => {
    res.status(200).json({ message: "Protected route accessed successfully" });
}

export { registerHandler as register, loginHandler as login, protectRoute };