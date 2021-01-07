import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { MoviegroupNoID } from '../../../../../../backend/src/types/movie';

import { TextField } from '../../../basic/formfields/textfield';


interface Props {
  onSubmit: (values: MoviegroupNoID) => void;
  onCancel: () => void;
}

export const AddMoviegroupForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
//        groupname: {
          name: "",
          seqnr: 0,
//        },
        subgroups: []
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
              name="name"
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

export default AddMoviegroupForm;
