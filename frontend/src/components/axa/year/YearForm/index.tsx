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
import { ShowField } from '../../../basic/formfields/showfield';

import { newYear } from '../../../../utils/axa/year';


interface Props {
  edittype: Edittype;
  onSubmit: (values: YearNoID) => void;
  onCancel: () => void;
}

export const YearForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const year: Year = useSelector((state: RootState) => state.axayear);
  const years: Year[] = useSelector((state: RootState) => state.axayears);

  const initialValues = (edittype===Edittype.EDIT && year) ? year : newYear(years);

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
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YearForm;
