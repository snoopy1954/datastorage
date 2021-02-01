import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { AccounttypeNoID, Accounttype } from '../../../../../../backend/src/types/account';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { nextAccounttype } from '../../../../utils/account/accounttype';


interface Props {
  edittype: Edittype;
  onSubmit: (values: AccounttypeNoID) => void;
  onCancel: () => void;
}

export const AccounttypeForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const accounttypes: Accounttype[] = useSelector((state: RootState) => state.accounttypes);
  const accounttype: Accounttype = useSelector((state: RootState) => state.accounttype);

  const initialValues = (edittype===Edittype.EDIT && accounttype) ? accounttype : nextAccounttype(accounttypes);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const errors: { [field: string]: string } = {};
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
              label='Reihenfolge'
              placeholder='Reihenfolge'
              name='seqnr'
              component={NumberField}
            />
            <Field
              label="IBAN"
              placeholder="IBAN"
              name="iban"
              component={TextField}
            />
            <Field
              label="BIC"
              placeholder="BIC"
              name="bic"
              component={TextField}
            />
            <Field
              label="Kontonummer"
              placeholder="Kontonummer"
              name="number"
              component={TextField}
            />
            <Field
              label="Kontostand"
              placeholder="Kontostand"
              name="balance"
              component={TextField}
            />
            <Field
              label="Kommentar"
              placeholder="Kommentar"
              name="comment"
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

export default AccounttypeForm;
