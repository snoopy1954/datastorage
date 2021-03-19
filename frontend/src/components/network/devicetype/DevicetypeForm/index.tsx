import React from "react";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { Devicetype, DevicetypeNoID } from '../../../../../../backend/src/types/network';

import { TextField } from '../../../basic/formfields/textfield';

import { newDevicetype } from '../../../../utils/network/devicetype';


interface Props {
  edittype: Edittype;
  devicetype: Devicetype;
  onSubmit: (values: DevicetypeNoID) => void;
  onCancel: () => void;
};

export const DevicetypeForm: React.FC<Props> = ({ edittype, devicetype, onSubmit, onCancel }) => {
  const initialValues = (edittype===Edittype.EDIT && devicetype) ? devicetype : newDevicetype();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.description) {
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

export default DevicetypeForm;
