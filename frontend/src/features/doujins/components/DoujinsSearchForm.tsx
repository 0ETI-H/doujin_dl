import { Button, TextField } from "@material-ui/core";
import { Field, Form } from "react-final-form";

interface DoujinsSearchFormValues {
  tagsInclude?: string[];
  tagsExclude?: string[];

  tagInclude: string;
  tagExclude: string;
}

const initialValues: DoujinsSearchFormValues = {
  tagsInclude: [],
  tagsExclude: [],
  tagInclude: "",
  tagExclude: "",
};

export const DoujinsSearchForm: React.FunctionComponent = () => {
  const onSubmit = (values: DoujinsSearchFormValues) => {
    console.log(values);
  };
  const validateRequired = (value) => {
    return value ? false : true;
  };
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="tagInclude"
            validate={validateRequired}
            render={({ input, meta }) => (
              <TextField
                {...input}
                variant="standard"
                label="Tag Include"
                placeholder="Reimu Hakurei"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
              ></TextField>
            )}
          ></Field>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      )}
    ></Form>
  );
};
