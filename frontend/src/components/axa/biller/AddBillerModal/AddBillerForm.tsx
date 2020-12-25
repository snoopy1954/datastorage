import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { TextField } from "./FormField";
import { NumberField } from '../../../basic/formfields/numberfield';
import { BillerNoID } from '../../../../../../backend/src/types/axa';

interface Props {
  seqnr: number;
  onSubmit: (values: BillerNoID) => void;
  onCancel: () => void;
}

export const AddBillerForm: React.FC<Props> = ({ seqnr, onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        name: {
          name: "",
          seqnr: seqnr
        },
        person: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name.name) {
          errors.name = requiredError;
        }
        if (!values.name.name) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Seqnr"
              placeholder="Seqnr"
              name="name.seqnr"
              component={NumberField}
              min='0'
            />
            <Field
              label="Name"
              placeholder="Name"
              name="name.name"
              component={TextField}
            />
            <Field
              label="Person"
              placeholder="Person"
              name="person"
              component={TextField}
            />
            <Menu compact stackable borderless style={{ background: backgroundColor }}>
              <Menu.Item>
                <Button type="submit" style={styleMainMenu} color="blue" disabled={!dirty || !isValid}>Speichern</Button>
              </Menu.Item>
              <Menu.Item>
                <Button type="button" style={styleMainMenu} onClick={onCancel} color="blue">Abbrechen</Button>
              </Menu.Item>
            </Menu>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddBillerForm;
