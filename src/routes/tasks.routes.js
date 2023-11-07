import { Router } from "express";
import { todoController } from "../controller/tasks.controller.js";

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);

export { userRouter };
