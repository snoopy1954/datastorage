import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { AccountyearNoID, Accountyear } from '../../../../../../backend/src/types/account';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { newAccountyear } from '../../../../utils/account/accountyear';


interface Props {
  edittype: Edittype;
  onSubmit: (values: AccountyearNoID) => void;
  onCancel: () => void;
}

export const AccountyearForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const year: Accountyear = useSelector((state: RootState) => state.accountyear);
  const years: Accountyear[] = useSelector((state: RootState) => state.accountyears);

  const initialValues = (edittype===Edittype.EDIT && year) ? year : newAccountyear(years);

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

export default AccountyearForm;
