import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { Doujin, setDoujinFocused } from "../doujins.slice";

interface Props {
  doujin: Doujin;
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export const DoujinCard: React.FunctionComponent<Props> = ({ doujin }) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    dispatch(setDoujinFocused(doujin));
  };

  console.log(doujin.pageUrls[0]);

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleClick}>
        {/* Note, images are much easier to work with than background images. You can set width to 100% and height auto-adjusts */}
        {/* Ideal when you want to constrain and display the entire image. If you care about uniformity, you can opt to use a background image */}
        {/* background-size: cover; does a really nice job @ that. Won't see entire image however. That is the tradeoff*/}
        <CardMedia component="img" src={doujin.pageUrls[0]}></CardMedia>
        <CardHeader title={doujin.title} subheader="Added Today"></CardHeader>
      </CardActionArea>
      {/* <MangaCardActions></MangaCardActions> */}
    </Card>
  );
};
