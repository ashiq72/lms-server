import { Router } from "express";
import { UserRouter } from "../app/routes/user";
import { StudentRoutes } from "../app/routes/student";

const router = Router();

router.use("/users", UserRouter);
router.use("/students", StudentRoutes);

export default router;
