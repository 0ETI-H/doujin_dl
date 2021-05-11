import express from "express";

export const doujinRouter = express.Router();

doujinRouter.get("/", (req, res) => {
  res.send("DOUJIN ROUTER");
});
