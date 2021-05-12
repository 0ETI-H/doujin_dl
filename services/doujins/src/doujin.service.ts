import fetch from "node-fetch";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
interface DoujinMetadata {
  digits: number;
  title: string;
  parodies: string[];
  characters: string[];
  tags: string[];
  artists: string[];
  groups: string[];
  languages: string[];
  pages: number;
}

interface UrlData {
  url: string;
  title: string;
}

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

export const getDoujinDataOnPage = async (url: string) => {
  const dom = await (await fetch(url)).text();
  const $ = cheerio.load(dom);

  const doujinDataOnPage = $(
    "div.container.index-container div.gallery a.cover"
  ).map((index, elem) => {
    const href = $(elem).attr("href");
    const title = $(elem).find("div.caption").text();
    return {
      title,
      url: `https://nhentai.net${href}`,
    };
  });

  return doujinDataOnPage.toArray();
};

export const getDoujinData = async (tags: string[]) => {
  const tagQuotes = getTagQuotes(tags);
  const baseUrl = getSearchUrl(tagQuotes);

  const totalPages = await getTotalPages(baseUrl);

  var doujinData: any[] = [];

  for (var counter = 1; counter <= totalPages; counter += 1) {
    const url = `${baseUrl}&page=${counter}`;
    const doujinUrlsOnPage = await getDoujinDataOnPage(url);
    doujinData = doujinData.concat(doujinUrlsOnPage);
  }

  return doujinData;
};

export const getDoujinMetadata = async ({
  url,
  title,
}: UrlData): Promise<DoujinMetadata> => {
  const dom = await (await fetch(url)).text();
  const $ = cheerio.load(dom);

  var parodies: string[] = [];
  $("section#tags div.tag-container:contains('Parodies:') span.tags")
    .find("a.tag span.name")
    .each((index, e) => {
      const tag = $(e).html();
      if (tag) {
        parodies.push(tag);
      }
    });

  var characters: string[] = [];
  $("section#tags div.tag-container:contains('Characters:') span.tags")
    .find("a.tag span.name")
    .each((index, e) => {
      const tag = $(e).html();
      if (tag) {
        characters.push(tag);
      }
    });

  var tags: string[] = [];
  $("section#tags div.tag-container:contains('Tags:') span.tags")
    .find("a.tag span.name")
    .each((index, e) => {
      const tag = $(e).html();
      if (tag) {
        tags.push(tag);
      }
    });

  var artists: string[] = [];
  $("section#tags div.tag-container:contains('Artists:') span.tags")
    .find("a.tag span.name")
    .each((index, e) => {
      const tag = $(e).html();
      if (tag) {
        artists.push(tag);
      }
    });

  var groups: string[] = [];
  $("section#tags div.tag-container:contains('Groups:') span.tags")
    .find("a.tag span.name")
    .each((index, e) => {
      const tag = $(e).html();
      if (tag) {
        groups.push(tag);
      }
    });

  var languages: string[] = [];
  $("section#tags div.tag-container:contains('Languages:') span.tags")
    .find("a.tag span.name")
    .each((index, e) => {
      const tag = $(e).html();
      if (tag) {
        languages.push(tag);
      }
    });

  const pages = $(
    "section#tags div.tag-container:contains('Pages:') span.tags a.tag span.name"
  ).html();

  var digits = $("div#cover a").attr("href");
  digits = digits?.split("/")[2];

  return {
    digits: digits ? parseInt(digits) : 0,
    title,
    parodies,
    characters,
    tags,
    artists,
    groups,
    languages,
    pages: pages ? parseInt(pages) : 0,
  };
};

export const downloadImage = async (url: string, path: string) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
};

export const downloadImageFromPage = async (
  url: string,
  destination: string
) => {
  console.log(`Downloading: ${url}`);

  const dom = await (await fetch(url)).text();
  const $ = cheerio.load(dom);

  const imageUrl = $("section#image-container a img").attr("src") || "";
  const imageSplit = imageUrl.split("/");
  const imageEnd = imageSplit[imageSplit.length - 1];

  downloadImage(imageUrl, path.join(destination, imageEnd));
};

export const downloadDoujin = async (doujinMetadata: DoujinMetadata) => {
  const destination = path.join(
    __dirname,
    "..",
    "images",
    doujinMetadata.title.replace("/", "_")
  );

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);

    for (var counter = 1; counter <= doujinMetadata.pages; counter += 1) {
      const pageUrl = `https://nhentai.net/g/${doujinMetadata.digits}/${counter}/`;
      await downloadImageFromPage(pageUrl, destination);
    }
  } else {
    console.log(`[SKIPPING] RECORD OF ${destination} FOUND`);
  }
};

export const downloadDoujinBatch = async (urlData: UrlData[]) => {
  for (var counter = 0; counter < urlData.length; counter += 1) {
    const metadata = await getDoujinMetadata(urlData[counter]);
    await downloadDoujin(metadata);
  }
};
