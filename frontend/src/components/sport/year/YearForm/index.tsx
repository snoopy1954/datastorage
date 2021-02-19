import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { YearNoID, Year } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { nextYear } from '../../../../utils/basic/year';


interface Props {
  edittype: Edittype;
  onSubmit: (values: YearNoID) => void;
  onCancel: () => void;
}

export const YearForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const year: Year = useSelector((state: RootState) => state.accountyear);
  const years: Year[] = useSelector((state: RootState) => state.accountyears);

  const initialValues = (edittype===Edittype.EDIT && year) ? year : nextYear(years);

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
            <Button style={styleButton} type="submit">Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YearForm;
