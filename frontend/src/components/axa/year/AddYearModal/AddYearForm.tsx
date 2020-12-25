import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { TextField } from "./FormField";
import { NumberField } from '../../../basic/formfields/numberfield';
import { ShowField } from '../../../basic/formfields/showfield';
import { YearNoID, Year } from '../../../../../../backend/src/types/axa';

import { newYear } from '../../../../utils/axa';


interface Props {
  years: Year[];
  onSubmit: (values: YearNoID) => void;
  onCancel: () => void;
}

export const AddYearForm: React.FC<Props> = ({ years, onSubmit, onCancel }) => {
  const initialValues = newYear(years);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name.name) {
          errors.name = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid }) => {
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
              label="Z100S"
              placeholder={initialValues.z100s}
              name="z100s"
              component={ShowField}
            />
            <Field
              label="VITAL750"
              placeholder={initialValues.vital750}
              name="vital750"
              component={ShowField}
            />
            <Menu compact stackable borderless style={{ background: backgroundColor }}>
              <Menu.Item>
                <Button type="submit" style={styleMainMenu} color="blue" disabled={!isValid}>Speichern</Button>
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

export default AddYearForm;
