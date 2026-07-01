import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/index.ts";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("", router);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});