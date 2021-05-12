import { Collapse, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectDownloadSuccess, setDownloadSuccess } from "../../doujins.slice";

export const DoujinsDownloadSuccess: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const downloadSuccess = useSelector(selectDownloadSuccess);

  return (
    <Collapse in={downloadSuccess}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              dispatch(setDownloadSuccess(false));
            }}
          >
            <Close></Close>
          </IconButton>
        }
      >
        Downloads are in progress. Reload the page and you should see the
        doujins roll in.
      </Alert>
    </Collapse>
  );
};
