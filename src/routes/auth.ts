import { Router } from "express";

// === Routes === //
import { login, protectRoute, register } from "../controllers/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", protectRoute);

export default router;