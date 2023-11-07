import { userService } from "../services/user.service.js";

import { catchAsync } from "../utils/catch-async.js";

class UserController {
    signUp = catchAsync(async (req, res) => {
        const { body } = req;
        const input = {
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password
        };
        const taskInput = {
            title: body.tasks.title,
            description: body.tasks.description
        };
        await userService.signUp(userInput, taskInput);
        res.status(201).json({
            massage: "Success"
        });
    });
}
