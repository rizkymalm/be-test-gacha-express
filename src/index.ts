import express from "express";
import "dotenv/config";
import connectDB from "./config/db.ts";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/index.ts";
import authRouter from "./router/auth.router.ts";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
connectDB();

app.use("", router);
app.use("/auth", authRouter)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});