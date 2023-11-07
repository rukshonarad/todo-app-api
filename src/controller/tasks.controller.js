import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";
import { taskService } from "../services/tasks.service.js";
class TaskController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;
        const input = {
            title: body.title,
            description: body.description
        };

        if (!input.title || !input.description) {
            throw new CustomError("Tite and Description are required", 400);
        }

        const task = await taskService.create(input, userId);

        res.status(201).json({
            data: task
        });
    });
}
export const taskController = new TaskController();
