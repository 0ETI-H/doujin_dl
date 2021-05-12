import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  selectDoujinsUrlData,
  selectSearchTagsInclude,
  thunkDoujins,
  thunkDoujinsUrlData,
} from "../doujins.slice";
import DataTable from "../Test";
import { DoujinsTagIncludeForm } from "./DoujinsTagIncludeForm";
import { DoujinUrlDataTable } from "./DoujinUrlDataTable";
import { IncludeTag } from "./tags/IncludeTag";

export const DoujinsTagForm: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const searchTagsInclude = useSelector(selectSearchTagsInclude);
  const searchTagsIncludeRender = searchTagsInclude.map((tag, index) => (
    <IncludeTag key={index} tag={tag}></IncludeTag>
  ));

  const findDoujins: React.MouseEventHandler = () => {
    dispatch(thunkDoujinsUrlData(searchTagsInclude));
  };

  const doujinsUrlData = useSelector(selectDoujinsUrlData);

  const downloadDoujins: React.MouseEventHandler = () => {
    dispatch(thunkDoujins(doujinsUrlData));
  };

  return (
    <Grid container item spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">Add Doujins</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Tags Included: </Typography>
        {searchTagsIncludeRender}
      </Grid>

      {/* INCLUDE TAG FORM DOUJINS */}
      <Grid item xs={12}>
        {/* <Typography variant="h6">Add a Tag to Include</Typography> */}
        <DoujinsTagIncludeForm></DoujinsTagIncludeForm>
      </Grid>

      {/* BUTTONS FOR DOUJIN ACTIONS */}
      <Grid item xs={12}>
        <Button variant="contained" onClick={findDoujins}>
          Find Doujins
        </Button>
        <Button variant="outlined" onClick={downloadDoujins}>
          Download Doujins
        </Button>
      </Grid>

      {/* TABLE OF DOUJIN URL INFO */}
      <Grid item xs={12}>
        <DoujinUrlDataTable></DoujinUrlDataTable>
        {/* <DataTable></DataTable> */}
      </Grid>
    </Grid>
  );
};
