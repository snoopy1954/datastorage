import React from "react";
import { useSelector } from 'react-redux';
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Edittype } from "../../../../types/basic";
import { Bill, BillWithFileDatesNoID, FileDate } from '../../../../../../backend/src/types/axa';
import { BillStatus, Insurancetype } from '../../../../types/axa';
import { Option } from '../../../../types/basic';
import { RootState } from '../../../../state/store';

import { TextField, SelectField, BillStatusOption, InsurancetypeOption, SelectFieldInvoicingParty, FileDateField, DetailsFieldArray } from "./FormField";

import { newBill, newFiledate } from '../../../../utils/axa';
import { backgroundColor, styleMainMenu } from "../../../../constants";


interface Props {
  edittype: Edittype;
  onSubmit: (values: BillWithFileDatesNoID) => void;
  onCancel: () => void;
}

export const AddBillForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const bill: Bill = useSelector((state: RootState) => state.bill);
  const invoicingparties = useSelector((state: RootState) => state.invoicingparties);

  const statusOptions: BillStatusOption[] = [];
  Object.values(BillStatus).forEach(statusvalue => {
    statusOptions.push({
      value: statusvalue,
      label: statusvalue
    })
  });

  const invoicingpartyOptions: Option[] = [];
  Object.values(invoicingparties).forEach(element => {
    invoicingpartyOptions.push({
      value: element.name,
      label: element.name
    })
  });

  const insurancetypeOptions: InsurancetypeOption[] = [];
  Object.values(Insurancetype).forEach(element => {
    insurancetypeOptions.push({
      value: element,
      label: element
    })
  });

  const filedates: FileDate[] = [];
  filedates.push(newFiledate());
  filedates.push(newFiledate());

  const initialValues: BillWithFileDatesNoID = (edittype===Edittype.EDIT && bill) 
    ? { ...bill, filedates } 
    : { ...newBill(), filedates };

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
            <SelectField
              label="Status"
              prompt="Bitte Status auswählen"
              name="status"
              options={statusOptions}
            />
            <SelectFieldInvoicingParty
              label="Rechnungssteller"
              prompt="Bitte Rechnungssteller auswählen"
              name="invoicingparty"
              options={invoicingpartyOptions}
            />
            <Field
              filedates={values.filedates}
              label="Rechnung/Rezept"
              placeholder="Rechnung/Rezept"
              name="invoice"
              component={FileDateField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              filedates={values.filedates}
              label="Quittung"
              placeholder="Quittung"
              name="recipe"
              component={FileDateField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <DetailsFieldArray
              details={values.details}
              options={insurancetypeOptions}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Menu compact stackable borderless style={{ background: backgroundColor }}>
              <Menu.Item>
                <Button type="submit" style={styleMainMenu} color="blue" disabled={!dirty || !isValid}>Speichern</Button>
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

export default AddBillForm;
