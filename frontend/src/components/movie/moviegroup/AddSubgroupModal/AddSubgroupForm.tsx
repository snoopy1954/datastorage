import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { backgroundColor, styleMainMenu } from '../../../../constants';

import { TextField } from '../../../basic/formfields/textfield';

export interface Value {
    value: string
}

interface Props {
  onSubmit: (values: Value) => void;
  onCancel: () => void;
}

export const AddSubgroupForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const initialValues = { value: '' };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.value) {
          errors.version = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Untergruppe"
              placeholder="Untergruppe"
              name="value"
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

export default AddSubgroupForm;
