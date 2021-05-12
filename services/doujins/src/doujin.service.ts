import fetch from "node-fetch";
import cheerio from "cheerio";

export const getTagQuotes = (tags: string[]) => tags.map((tag) => `"${tag}"`);

export const getSearchUrl = (tags: string[]) => {
  const NHENTAI_SEARCH_URL = `https://nhentai.net/search/?q=${tags.join(
    "+"
  )}&sort=popular`;

  return NHENTAI_SEARCH_URL;
};

export const getTotalPages = async (url: string) => {
  const dom = await (await fetch(url)).text();
  const $ = cheerio.load(dom);
  const totalPages = $("section a.page").last().html();

  if (totalPages) {
    return parseInt(totalPages);
  } else {
    return 1;
  }
};

export const getDoujinUrlsOnPage = async (url: string) => {
  const dom = await (await fetch(url)).text();
  const $ = cheerio.load(dom);

  const doujinUrlsOnPage = $(
    "div.container.index-container div.gallery a.cover"
  ).map((index, elem) => {
    return `https://nhentai.net${$(elem).attr("href")}`;
  });

  return doujinUrlsOnPage.toArray().map((elem) => elem.toString());
};

export const getDoujinUrls = async (tags: string[]) => {
  const tagQuotes = getTagQuotes(tags);
  const baseUrl = getSearchUrl(tagQuotes);

  const totalPages = await getTotalPages(baseUrl);

  var doujinUrls: string[] = [];

  for (var counter = 1; counter <= totalPages; counter += 1) {
    const url = `${baseUrl}&page=${counter}`;
    const doujinUrlsOnPage = await getDoujinUrlsOnPage(url);
    doujinUrls = doujinUrls.concat(doujinUrlsOnPage);
  }

  return doujinUrls;
};
