import { Chip } from "@material-ui/core";

interface Props {
  title: string;
  url: string;
}

export const DoujinUrlDisplay: React.FunctionComponent<Props> = ({
  title,
  url,
}) => {
  const handleDelete = () => {};

  return (
    <Chip
      label={`${url} ${title}`}
      onClick={handleDelete}
      onDelete={handleDelete}
    ></Chip>
  );
};
