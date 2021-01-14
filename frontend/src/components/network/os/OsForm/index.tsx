import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { OsNoID } from '../../../../../../backend/src/types/network';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';

import { newOs } from '../../../../utils/network/os';


interface Props {
  edittype: Edittype;
  onSubmit: (values: OsNoID) => void;
  onCancel: () => void;
}

export const OsForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const os = useSelector((state: RootState) => state.selectedos);      

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
              label="Description"
              placeholder="Description"
              name="description"
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

export default OsForm;
