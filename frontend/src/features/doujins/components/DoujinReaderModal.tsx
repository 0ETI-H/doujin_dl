import { Dialog, DialogTitle, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectDoujinFocused, setDoujinFocused } from "../doujins.slice";

export const DoujinReaderModal: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const doujinFocused = useSelector(selectDoujinFocused);
  // console.log(focusedMangaEntity);

  const handleClose = () => {
    dispatch(setDoujinFocused({ title: "", pageUrls: [] }));
  };

  const imagesRendered = doujinFocused.pageUrls.map((url) => (
    <img src={url} width="100%"></img>
  ));

  return (
    <Dialog
      open={doujinFocused.title !== ""}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>{doujinFocused.title}</DialogTitle>
      <Grid container justify="center">
        <Grid item>{imagesRendered}</Grid>
      </Grid>
    </Dialog>
  );
};
