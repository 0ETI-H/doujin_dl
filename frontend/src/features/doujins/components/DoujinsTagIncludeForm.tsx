import { Button, TextField } from "@material-ui/core";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { addTagInclude } from "../doujins.slice";

interface DoujinsTagIncludeFormValues {
  tagInclude: string;
}

const initialState: DoujinsTagIncludeFormValues = {
  tagInclude: "",
};

export const DoujinsTagIncludeForm: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const onSubmit = (values: DoujinsTagIncludeFormValues, form) => {
    dispatch(addTagInclude(values.tagInclude));
    form.reset();
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialState}
      render={({ handleSubmit, form, submitting, pristine, values, valid }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="tagInclude"
            render={({ input, meta }) => (
              <TextField
                {...input}
                variant="standard"
                label="Add a Tag to Include"
                placeholder="kemonomimi"
                error={meta.touched && meta.error}
                helperText={
                  meta.touched && meta.error
                    ? meta.error
                    : "fetish, character, artist, or language"
                }
              ></TextField>
            )}
          ></Field>
          {/* 
          <Button type="submit" variant="text" color="primary">
            Include Tag
          </Button> */}
        </form>
      )}
    ></Form>
  );
};
