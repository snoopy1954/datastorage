import React from "react";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Version } from '../../../../../../backend/src/types/network';

import { TextField } from '../../../basic/formfields/textfield';


interface Props {
  onSubmit: (values: Version) => void;
  onCancel: () => void;
}

export const VersionForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const initialValues = { version: '' };

  return (
    <Formik
      initialValues={initialValues}
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
              label="Version"
              placeholder="Version"
              name="version"
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

export default VersionForm;
