import express from "express";
import { loiginHandler, registerHandler } from "./routes/user";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loiginHandler);

export default router;