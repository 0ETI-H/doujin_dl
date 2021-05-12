import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { GetStaticProps } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DoujinsSearchForm } from "../features/doujins/components/DoujinsSearchForm";
import { DoujinsTagIncludeForm } from "../features/doujins/components/DoujinsTagIncludeForm";
import { DoujinUrlDisplay } from "../features/doujins/components/DoujinUrlDisplay";
import { IncludeTag } from "../features/doujins/components/tags/IncludeTag";
import {
  Doujin,
  selectDoujinsUrlData,
  selectSearchTagsInclude,
  setDoujins,
  thunkDoujinsUrlData,
} from "../features/doujins/doujins.slice";

import fs from "fs";
import path from "path";
import { DoujinCardList } from "../features/doujins/components/DoujinCardList";
import { DoujinReaderModal } from "../features/doujins/components/DoujinReaderModal";
interface Props {
  doujins: Doujin[];
}

const Home: React.FunctionComponent<Props> = ({ doujins }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDoujins(doujins));
  }, []);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      cont: {
        padding: theme.spacing(2),
      },
    })
  );
  const classes = useStyles();

  const searchTagsInclude = useSelector(selectSearchTagsInclude);
  const searchTagsIncludeRender = searchTagsInclude.map((tag, index) => (
    <IncludeTag key={index} tag={tag}></IncludeTag>
  ));

  const doujinsUrlData = useSelector(selectDoujinsUrlData);
  const doujinsUrlDataRender = doujinsUrlData.map((doujinUrlData) => (
    <React.Fragment>
      <DoujinUrlDisplay
        title={doujinUrlData.title}
        url={doujinUrlData.url}
      ></DoujinUrlDisplay>
      <br></br>
    </React.Fragment>
  ));

  const handleClick1: React.MouseEventHandler = (e) => {
    dispatch(thunkDoujinsUrlData(searchTagsInclude));
  };

  const handleClick2: React.MouseEventHandler = (e) => {};

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={10}>
          <Typography variant="h3">Testing</Typography>
        </Grid>
        <Grid item xs={10}>
          <Paper>
            <div className={classes.cont}>
              <Typography variant="caption">Tags Included: </Typography>
              {searchTagsIncludeRender}
              <br></br>
              {doujinsUrlDataRender}
              <DoujinsTagIncludeForm></DoujinsTagIncludeForm>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick1}
              >
                Get Doujin Data
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick2}
              >
                Download Doujins
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper>
            {/* <Typography variant="h2">ke-ta</Typography> */}
            <DoujinCardList></DoujinCardList>
          </Paper>
        </Grid>
      </Grid>

      <DoujinReaderModal></DoujinReaderModal>
    </div>
  );
};

export default Home;

// Get manga from the public manga folder
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const DOUJIN_DIR = path.join(__dirname, "..", "..", "..", "public", "images");
  const doujin_titles = fs
    .readdirSync(DOUJIN_DIR)
    .filter((title) => title !== ".DS_Store" && !title.endsWith(".jpg"));

  const doujins: Doujin[] = doujin_titles.map((mangaTitle, index) => {
    // Get manga path to search for images in filesystem
    const doujinPath = path.join(DOUJIN_DIR, mangaTitle);

    // Read all contents of dir, filtering those that have an image filetype
    const imageNames = fs
      .readdirSync(doujinPath)
      .filter(
        (imageName) => imageName.endsWith(".png") || imageName.endsWith(".jpg")
      );

    // Sort images in order
    const imageNamesSorted = imageNames.sort((im1, im2) => {
      const num1 = parseInt(im1.split(".")[0]);
      const num2 = parseInt(im2.split(".")[0]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      } else {
        return 0;
      }
    });

    // Public URLs
    const pageUrls = imageNamesSorted.map(
      (name) => `/images/${mangaTitle}/${name}`
    );

    return {
      title: mangaTitle,
      pageUrls,
    };
  });

  return {
    props: {
      doujins,
    },
  };
};
