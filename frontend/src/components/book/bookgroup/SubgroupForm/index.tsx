import React from "react";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { TextField } from '../../../basic/formfields/textfield';

export interface Value {
    value: string
}

interface Props {
  onSubmit: (values: Value) => void;
  onCancel: () => void;
}

export const SubgroupForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
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
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SubgroupForm;