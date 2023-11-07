import express from "express";
import dotenv from "dotenv";
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log("Server is running ", PORT);
});
