import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DoujinsSearchForm } from "../features/doujins/components/DoujinsSearchForm";
import { DoujinsTagIncludeForm } from "../features/doujins/components/DoujinsTagIncludeForm";
import { DoujinUrlDisplay } from "../features/doujins/components/DoujinUrlDisplay";
import { IncludeTag } from "../features/doujins/components/tags/IncludeTag";
import {
  selectDoujinsUrlData,
  selectSearchTagsInclude,
  thunkDoujinsUrlData,
} from "../features/doujins/doujins.slice";

export default function Home() {
  const dispatch = useDispatch();
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
      <Typography variant="h3">Testing</Typography>
      <Typography variant="caption">Tags Included: </Typography>
      {searchTagsIncludeRender}
      <br></br>
      {doujinsUrlDataRender}
      <DoujinsTagIncludeForm></DoujinsTagIncludeForm>
      <Button variant="contained" color="primary" onClick={handleClick1}>
        Get Doujin Data
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClick2}>
        Download Doujins
      </Button>
    </div>
  );
}
