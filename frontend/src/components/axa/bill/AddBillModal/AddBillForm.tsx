import React from "react";
import { useSelector } from 'react-redux';
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Edittype } from "../../../../types/basic";
import { Bill, BillWithFileDatesNoID, FileDate, Biller } from '../../../../../../backend/src/types/axa';
import { BillStatus, Insurancetype } from '../../../../types/axa';
import { Option } from '../../../../types/basic';
import { RootState } from '../../../../state/store';

import { TextField, BillStatusOption, InsurancetypeOption, DetailsFieldArray } from "./FormField";
import { SelectField } from '../../../basic/formfields/selectfield';
import { FilePickDateField } from '../../../basic/formfields/filepickdatefield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { newFiledate } from '../../../../utils/axa';
import { newBill } from '../../../../utils/axa/bill';
import { backgroundColor, styleMainMenu } from "../../../../constants";


interface Props {
  edittype: Edittype;
  onSubmit: (values: BillWithFileDatesNoID) => void;
  onCancel: () => void;
}

export const AddBillForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const bill: Bill = useSelector((state: RootState) => state.bill);
  const bills: Bill[] = useSelector((state: RootState) => state.bills);
  const billers: Biller[] = useSelector((state: RootState) => state.billers);

  const statusOptions: BillStatusOption[] = [];
  Object.values(BillStatus).forEach(statusvalue => {
    statusOptions.push({
      value: statusvalue,
      label: statusvalue
    })
  });

  const billerOptions: Option[] = [];
  Object.values(billers).forEach(element => {
    billerOptions.push({
      value: element.name.name,
      label: element.name.name
    })
  });

  const insurancetypeOptions: InsurancetypeOption[] = [];
  Object.values(Insurancetype).forEach(element => {
    insurancetypeOptions.push({
      value: element,
      label: element
    })
  });

  // const filedates: FileDate[] = [];
  // filedates.push(newFiledate());
  // filedates.push(newFiledate());

  const invoice: FileDate = newFiledate();
  const recipe: FileDate = newFiledate();

  const initialValues: BillWithFileDatesNoID = (edittype===Edittype.EDIT && bill) 
    ? { ...bill, invoice, recipe } 
    : { ...newBill(bills), invoice, recipe };

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
              name="name.name"
              component={TextField}
            />
            <Field
              label="Seqnr"
              placeholder="Seqnr"
              name="name.seqnr"
              component={NumberField}
              min='0'
            />
            <SelectField
              label="Status"
              prompt="Bitte Status auswählen"
              name="status"
              options={statusOptions}
            />
            <SelectField
              label="Rechnungssteller"
              name="invoicingparty"
              prompt="Bitte Rechnungssteller auswählen"
              options={billerOptions}
            />
            <Field
              label="Rechnung/Rezept"
              filedate={values.invoice}
              name="invoice"
              component={FilePickDateField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Quittung"
              filedate={values.recipe}
              name="recipe"
              component={FilePickDateField}
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
