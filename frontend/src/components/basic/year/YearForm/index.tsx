import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { Year, YearNoID } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';

import { TextField } from '../../formfields/textfield';
import { NumberField } from '../../formfields/numberfield';

import { nextYear } from '../../../../utils/basic/year';


interface Props {
  edittype: Edittype;
  year: Year;
  onSubmit: (values: YearNoID) => void;
  onCancel: () => void;
};

export const YearForm: React.FC<Props> = ({ edittype, year, onSubmit, onCancel }) => {
  const years: Year[] = useSelector((state: RootState) => state.years);      

  const initialValues = (edittype===Edittype.EDIT && year) ? year : nextYear(years);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const errors: { [field: string]: string } = {};
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
              label='Reihenfolge'
              placeholder='Reihenfolge'
              name='seqnr'
              component={NumberField}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YearForm;
