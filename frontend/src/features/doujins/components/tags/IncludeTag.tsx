import { Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteTagInclude } from "../../doujins.slice";

interface Props {
  tag: string;
}

export const IncludeTag: React.FunctionComponent<Props> = ({ tag }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTagInclude(tag));
  };

  return (
    <Chip
      variant="outlined"
      label={tag}
      onClick={handleDelete}
      onDelete={handleDelete}
    ></Chip>
  );
};
