import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { taskController } from "../controller/tasks.controller.js";

const taskRouter = Router();

taskRouter.post("/", userMiddleware.authenticate, taskController.create);

export { taskRouter };
