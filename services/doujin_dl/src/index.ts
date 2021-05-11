import express from "express";
import { doujinRouter } from "./routes/doujinRouter";

const app = express();

app.use("/doujin", doujinRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("App Running on 3000");
});
