import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectDoujins } from "../doujins.slice";
import { DoujinCard } from "./DoujinCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
  })
);

export const DoujinCardList: React.FunctionComponent = () => {
  const doujins = useSelector(selectDoujins);
  const doujinsRender = doujins.map((doujin, index) => (
    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
      <DoujinCard doujin={doujin}></DoujinCard>
    </Grid>
  ));

  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {doujinsRender}
    </Grid>
  );
};
