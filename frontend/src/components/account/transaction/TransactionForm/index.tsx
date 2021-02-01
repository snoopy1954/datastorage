import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { TransactionNoID } from '../../../../../../backend/src/types/account'
import { Option, Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { nextTransaction } from '../../../../utils/account/transaction';


interface Props {
  edittype: Edittype;
  onSubmit: (values: TransactionNoID) => void;
  onCancel: () => void;
}

export const TransactionForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const transaction = useSelector((state: RootState) => state.transaction);
  const transactions = useSelector((state: RootState) => state.transactions);
  const accounttypes = useSelector((state: RootState) => state.accounttypes);
  const accountfilter = useSelector((state: RootState) => state.accountfilter);

  const accountypeOptions: Option[] = [];
  Object.values(accounttypes).forEach(element => {
    accountypeOptions.push({
      value: element.name,
      label: element.name
    })
  });

  const initialValues = edittype===Edittype.EDIT && transaction ? transaction : nextTransaction(transactions, accountfilter);
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const errors: { [field: string]: string } = {};
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Titel"
              placeholder="Titel"
              name="name"
              component={TextField}
            />
            <Field
              label="Seqnr"
              placeholder="Seqnr"
              name="seqnr"
              component={NumberField}
              min='0'
            />
            <Field
              label="Konto"
              placeholder="Konto"
              name="accounttype"
              component={TextField}
            />
            <Field
              label="Datum"
              placeholder="Datum"
              name="date"
              component={TextField}
            />
            <Field
              label="Jahr"
              placeholder="Jahr"
              name="year"
              component={TextField}
            />
            <Field
              label="Monat"
              placeholder="Monat"
              name="month"
              component={TextField}
            />
            <Field
              label="Text"
              placeholder="Text"
              name="text"
              component={TextField}
            />
            <Field
              label="Grund"
              placeholder="Grund"
              name="purpose"
              component={TextField}
            />
            <Field
              label="Person"
              placeholder="Person"
              name="person"
              component={TextField}
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
              label="Währung"
              placeholder="Währung"
              name="currency"
              component={TextField}
            />
            <Field
              label="Betrag"
              placeholder="Betrag"
              name="value"
              component={TextField}
            />
            <Field
              label="Kontostand"
              placeholder="Kontostand"
              name="balance"
              component={TextField}
            />
            <Field
              label="Info"
              placeholder="Info"
              name="info"
              component={TextField}
            />
            <Field
              label="Checksum"
              placeholder="Checksum"
              name="checksum"
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

export default TransactionForm;
