import express from "express";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/tasks.routes.js";
import dotenv from "dotenv";
import { GlobalError } from "./src/middleware/global.error.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});
