import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { TextField } from "./FormField";
import { InvoicingPartyNoID } from '../../../../../../backend/src/types/axa';

interface Props {
  onSubmit: (values: InvoicingPartyNoID) => void;
  onCancel: () => void;
}

export const AddInvoicingpartyForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        person: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.name) {
          errors.description = requiredError;
        }
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

export default AddInvoicingpartyForm;
