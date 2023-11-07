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
    login = catchAsync(async (req, res) => {
        const { body } = req;
        const input = {
            email: body.email,
            password: body.password
        };

        const jwt = await userService.login(input);
        res.status(200).json({
            token: jwt
        });
    });
}
export const userController = new UserController();
