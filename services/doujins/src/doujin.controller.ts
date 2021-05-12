import express from "express";
import request from "request";
import cheerio from "cheerio";
import fetch from "node-fetch";
import { getDoujinUrls } from "./doujin.service";

export const doujinRouter = express.Router();

doujinRouter.get("/", (req, res) => {
  res.send("DOUJIN ROUTER ONLINE");
});
interface SearchReqBody {
  tags: string[];
  downloadLimit: number;
}

// Search for URLS
doujinRouter.post("/search", async (req, res) => {
  const { tags, downloadLimit }: SearchReqBody = req.body;

  const doujinUrls = getDoujinUrls(tags);

  doujinUrls.then((data) => console.log(data));

  return res.json(doujinUrls);
});
