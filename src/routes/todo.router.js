import { Router } from "express";
import { todoController } from "../controller/todo.controller.js";

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);
export { userRouter };
