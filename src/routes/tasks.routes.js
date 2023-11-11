import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { taskController } from "../controller/tasks.controller.js";

const taskRouter = Router();

taskRouter.post("/", userMiddleware.authenticate, taskController.create);
taskRouter.get("/:id", userMiddleware.authenticate, taskController.getOne);

taskRouter.patch("/:id", userMiddleware.authenticate, taskController.update);
taskRouter.get("/", userMiddleware.authenticate, taskController.getAll);
taskRouter.delete("/:id", taskController.deleteTask);
export { taskRouter };
