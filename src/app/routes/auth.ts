import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { AuthValidation } from "../zod/auth";
import { AuthControllers } from "../controllers/auth";

const router = express.Router();

router.post("/login", AuthControllers.loginUser);

export const AuthRoutes = router;
