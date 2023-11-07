import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";

class TaskController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;
        const input = {
            title: body.title,
            description: body.description
        };

        if (!input.title || !input.description) {
            throw new CustomError("Name and Description are required", 400);
        }

        const project = await projectService.create(input, userId);

        res.status(201).json({
            data: project
        });
    });
}
