import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { YearNoID, Year } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { newYear } from '../../../../utils/axa/year';


interface Props {
  edittype: Edittype;
  year: Year;
  onSubmit: (values: YearNoID) => void;
  onCancel: () => void;
}

export const YearForm: React.FC<Props> = ({ edittype, year, onSubmit, onCancel }) => {
  const years: Year[] = useSelector((state: RootState) => state.axayears);

  const initialValues = (edittype===Edittype.EDIT && year) ? year : newYear(years);

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
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Seqnr"
              placeholder="Seqnr"
              name="seqnr"
              component={NumberField}
              min='0'
            />
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Z100S"
              placeholder="Z100S"
              name="z100s"
              component={TextField}
            />
            <Field
              label="VITAL750"
              placeholder="Z100S"
              name="vital750"
              component={TextField}
            />
            <Button style={styleButton} type="submit" disabled={!isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YearForm;
