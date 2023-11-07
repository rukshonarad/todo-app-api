import { prisma } from "../prisma/index.js";
import { CustomError } from "../utils/custom-error.js";
class TaskService {
    create = async (input, userId) => {
        const task = await prisma.task.create({
            data: {
                ...input,
                userId: userId
            }
        });

        return task;
    };
}
export const taskService = new TaskService();
