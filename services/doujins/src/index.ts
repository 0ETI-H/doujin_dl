import express from "express";
import { doujinRouter } from "./doujin.controller";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.use("", doujinRouter);

app.listen(3000, () => {
  console.log("[Doujins Service] Running on Port 3000");
});
