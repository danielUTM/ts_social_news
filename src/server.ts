import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error: Error) => {
    throw new Error(error.message);
  });