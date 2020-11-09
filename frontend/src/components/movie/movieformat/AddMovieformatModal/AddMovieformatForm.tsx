import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";
import { MovieformatNoID } from '../../../../../../backend/src/types/movie';

interface Props {
  onSubmit: (values: MovieformatNoID) => void;
  onCancel: () => void;
}

export const AddMovieformatForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        formatname: {
          name: "",
          seqnr: 0
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const errors: { [field: string]: string } = {};
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="formatname.name"
              component={TextField}
            />
            <Grid>
              <Grid.Column>
                <Button type="button" onClick={onCancel} color="red">
                  Abbrechen
                </Button>
                <Button
                  type="submit"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Speichern
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddMovieformatForm;