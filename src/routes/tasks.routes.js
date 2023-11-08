import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { taskController } from "../controller/tasks.controller.js";

const taskRouter = Router();

taskRouter.post("/", userMiddleware.authenticate, taskController.create);
taskRouter.get("/:id", userMiddleware.authenticate, taskController.getOne);

taskRouter.patch("/:id", userMiddleware.authenticate, taskController.update);
taskRouter.get("/", userMiddleware.authenticate, taskController.getAll);

taskRouter.patch(
    "/:id/archive",
    userMiddleware.authenticate,
    taskController.archive
);
taskRouter.patch(
    "/:id/reactivate",
    userMiddleware.authenticate,
    taskController.reactivate
);

export { taskRouter };
