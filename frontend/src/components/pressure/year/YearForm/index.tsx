import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { YearNoID, Year } from '../../../../../../backend/src/types/pressure';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { BooleanField } from '../../../basic/formfields/booleanfield';

import { newYear } from '../../../../utils/pressure/year';


interface Props {
  edittype: Edittype;
  onSubmit: (values: YearNoID) => void;
  onCancel: () => void;
}

export const YearForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const years: Year[] = useSelector((state: RootState) => state.yearlist);
  const year: Year = useSelector((state: RootState) => state.selectedyear);

  const initialValues = edittype===Edittype.EDIT ? year : newYear(years);

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
              label="letzter Monat"
              placeholder="letzter Monat"
              name="lastMonth"
              component={NumberField}
              min='0'
            />
            <Field
              label="letztes Jahr"
              placeholder="letztes Jahr"
              name="isLastYear"
              component={BooleanField}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} type="button" onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YearForm;
