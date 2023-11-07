import { prisma } from "../prisma/index.js";
import { CustomError } from "../utils/custom-error.js";

create = async (input, userId) => {
    const task = await prisma.task.create({
        data: {
            ...input,
            userId: userId
        }
    });

    return task;
};
