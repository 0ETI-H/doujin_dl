import express from "express";
import request from "request";
import cheerio from "cheerio";
import fetch from "node-fetch";
import {
  downloadDoujin,
  getDoujinMetadata,
  getDoujinData,
  downloadDoujinBatch,
} from "./doujin.service";

export const doujinRouter = express.Router();

doujinRouter.get("/", (req, res) => {
  res.send("DOUJIN ROUTER ONLINE");
});
interface SearchReqBody {
  searchTagsInclude: string[];
  searchTagsExclude: string[];
  downloadLimit: number;
}

// Search for URLS
doujinRouter.post("/search", async (req, res) => {
  const { searchTagsInclude, searchTagsExclude, downloadLimit }: SearchReqBody =
    req.body;

  const doujinUrls = await getDoujinData(searchTagsInclude);

  return res.json(doujinUrls);
});

interface DownloadReqBody {
  doujinUrlData: {
    title: string;
    url: string;
  };
}

doujinRouter.post("/download", async (req, res) => {
  const { doujinUrlData }: DownloadReqBody = req.body;

  const doujinMetadata = await getDoujinMetadata(doujinUrlData);

  downloadDoujin(doujinMetadata);

  return res.json({});
});

interface DownloadBatchReqBody {
  doujinsUrlData: {
    title: string;
    url: string;
  }[];
}

doujinRouter.post("/download-batch", async (req, res) => {
  const { doujinsUrlData }: DownloadBatchReqBody = req.body;
  // console.log(doujinsUrlData);

  // Don't want to await. Just let it run in the background.
  downloadDoujinBatch(doujinsUrlData);

  return res.json({ pending: "IN PROGRESS" });
});
