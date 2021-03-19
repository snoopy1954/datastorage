import React from "react";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { Os, OsNoID } from '../../../../../../backend/src/types/network';

import { TextField } from '../../../basic/formfields/textfield';
import { TextFieldArray } from '../../../basic/formfields/textfieldarray';

import { newOs } from '../../../../utils/network/os';


interface Props {
  edittype: Edittype;
  os: Os;
  onSubmit: (values: OsNoID) => void;
  onCancel: () => void;
}

export const OsForm: React.FC<Props> = ({ edittype, os, onSubmit, onCancel }) => {
  const initialValues = (edittype===Edittype.EDIT && os) ? os : newOs();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.versions) {
          errors.name = requiredError;
        }
        if (!values.name) {
          errors.os = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              name='versions'
              items={values.versions}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={TextFieldArray}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OsForm;
