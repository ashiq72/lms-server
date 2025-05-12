import express from "express";
import { UserController } from "../controllers/user";
const router = express.Router();

router.post("/create-student", UserController.createStudent);

export const UserRouter = router;
