import { Router } from "express";
import { userController } from "../controller/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.patch("/forgot-password", userController.forgotPassword);
userRouter.patch("/reset-password", userController.resetPassword);
userRouter.get("/me", userMiddleware.authenticate, userController.getMe);
userRouter.delete(
    "/logout",
    userMiddleware.authenticate,
    userController.logout
);

export { userRouter };
