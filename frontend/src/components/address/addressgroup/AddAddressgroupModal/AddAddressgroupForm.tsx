import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { AddressgroupNoID } from '../../../../../../backend/src/types/address';

import { TextField } from '../../../basic/formfields/textfield';


interface Props {
  onSubmit: (values: AddressgroupNoID) => void;
  onCancel: () => void;
}

export const AddAddressgroupForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        groupname: { name: "", seqnr: 0 }
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
              name="groupname.name"
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

export default AddAddressgroupForm;
