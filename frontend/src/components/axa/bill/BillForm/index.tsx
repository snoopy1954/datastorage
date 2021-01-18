import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Bill, Biller } from '../../../../../../backend/src/types/axa';
import { BillStatus, Insurancetype, BillWithFileDatesNoID, FileDate } from '../../../../types/axa';
import { Option } from '../../../../types/basic';

import { RootState } from '../../../../state/store';

import { BillStatusOption, InsurancetypeOption, DetailsFieldArray } from "./FormField";
import { TextField } from '../../../basic/formfields/textfield';
import { ShowField } from '../../../basic/formfields/showfield';
import { SelectField } from '../../../basic/formfields/selectfield';
import { FilePickDateField } from '../../../basic/formfields/filepickdatefield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { newFiledate } from '../../../../utils/basic';
import { newBill } from '../../../../utils/axa/bill';


interface Props {
  edittype: Edittype;
  onSubmit: (values: BillWithFileDatesNoID) => void;
  onCancel: () => void;
}

export const BillForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const [ editInvoice, setEditInvoice ] = useState(false); 
  const [ editRecipe, setEditRecipe ] = useState(false); 

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

  let invoiceFilename: string = '';
  let invoiceReceived: string = '';
  let invoiceButton: string = 'Anlegen';
  let recipeFilename: string = '';
  let recipeReceived: string = '';
  let recipeButton: string = 'Anlegen';

  const invoice: FileDate = newFiledate();
  if (bill.notes.length>0) {
    invoice.date = bill.notes[0].received;
    invoiceFilename = bill.notes[0].filename;
    invoiceReceived = bill.notes[0].received;
    invoiceButton = 'Ändern'; 
    };

  const recipe: FileDate = newFiledate();
  if (bill.notes.length===2) {
    recipe.date = bill.notes[1].received;
    recipeFilename = bill.notes[1].filename;
    recipeReceived = bill.notes[1].received;
    recipeButton = 'Ändern'; 
  };

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
            {edittype===Edittype.EDIT&&<Field
              label="Status"
              name="status"
              prompt="Bitte Status auswählen"
              component={SelectField}
              options={statusOptions}
            />}
            <Field
              label="Rechnungssteller"
              name="invoicingparty"
              prompt="Bitte Rechnungssteller auswählen"
              component={SelectField}
              options={billerOptions}
            />
            {!editInvoice&&<Field
              label="Rechnung/Rezept"
              placeholder={invoiceFilename}
              name='notes[0].filename'
              component={ShowField}
            />}
            {!editInvoice&&<Field
              label="Datum"
              placeholder={invoiceReceived}
              name='notes[0].received'
              component={ShowField}
            />}
            {!editInvoice&&<Button type="button" style={styleButton} onClick={() => setEditInvoice(true)}>{invoiceButton}</Button>}
            {editInvoice&&<Field
              label="Rechnung/Rezept"
              filedate={values.invoice}
              name="invoice"
              component={FilePickDateField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />}
            {!editRecipe&&<Field
              label="Quittung"
              placeholder={recipeFilename}
              name='notes[1].filename'
              component={ShowField}
            />}
            {!editRecipe&&<Field
              label="Datum"
              placeholder={recipeReceived}
              name='notes[1].received'
              component={ShowField}
            />}
            {!editRecipe&&<Button type="button" style={styleButton} onClick={() => setEditRecipe(true)}>{recipeButton}</Button>}
            {editRecipe&&<Field
              label="Quittung"
              filedate={values.recipe}
              name="recipe"
              component={FilePickDateField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />}
            <DetailsFieldArray
              details={values.details}
              options={insurancetypeOptions}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Button type="submit" style={styleButton} disabled={!dirty || !isValid}>Speichern</Button>
            <Button type="button" style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
         </Form>
        );
      }}
    </Formik>
  );
};

export default BillForm;
