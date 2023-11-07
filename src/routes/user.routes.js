import { Router } from "express";
import { userController } from "../controller/user.controller.js";
// import { userMiddleware } from "../middleware/user.middleware.js";

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/login", userController.login);

export { userRouter };
