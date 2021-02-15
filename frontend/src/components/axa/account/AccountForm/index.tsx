import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype, Option } from "../../../../types/basic";
import { AccountStatus, FileDate, AccountWithFileDateNoID } from '../../../../types/axa';

import { RootState } from '../../../../state/store';

import { ShowField } from '../../../basic/formfields/showfield';
import { TextField } from '../../../basic/formfields/textfield';
import { PickField } from '../../../basic/formfields/pickdatefield';
import { SelectField } from '../../../basic/formfields/selectfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { FilePickDateField } from '../../../basic/formfields/filepickdatefield';

import { getCurrentDate, isValidDate } from '../../../../utils/basic';
import { newFiledate } from '../../../../utils/basic';
import { newAccount } from '../../../../utils/axa/account';


interface Props {
  edittype: Edittype;
  onSubmit: (values: AccountWithFileDateNoID) => void;
  onCancel: () => void;
}

export const AccountForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const [ addNote, setAddNote ] = useState(false); 

  const account = useSelector((state: RootState) => state.account);
  const accounts = useSelector((state: RootState) => state.accounts);

  const statusOptions: Option[] = [];
  Object.values(AccountStatus).forEach(statusvalue => {
    statusOptions.push({
      value: statusvalue,
      label: statusvalue
    })
  });

  const note: FileDate = newFiledate();

  const initialValues: AccountWithFileDateNoID = (edittype===Edittype.EDIT && account) 
    ? { ...account, note } 
    : { ...newAccount(accounts), note };
  if (edittype===Edittype.EDIT && initialValues.passed==='') initialValues.passed = getCurrentDate();
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        console.log(values)
        const errors: { [field: string]: string } = {};
        if (edittype===Edittype.EDIT) {
          if (values.status===AccountStatus.PASSED) {
            if (values.passed==='' || !isValidDate(values.passed)) {
              errors.passed = 'Datum fehlt oder ist falsch oder liegt in der Zukunft';
            }
            else {
              delete errors.passed;
            }
          }
        }
         return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            {edittype===Edittype.ADD&&<Field
              label="Name"
              date={values.name.name}
              name="name.name"
              component={PickField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />}
            {edittype===Edittype.EDIT&&<Field
              label="Name"
              placeholder={initialValues.name.name}
              name="name.name"
              component={ShowField}
            />}
            <Field
              label="Jahr"
              placeholder="Jahr"
              name={`details[0].year`}
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
            {edittype===Edittype.ADD&&<Field
              label="Status"
              name="status"
              component={ShowField}
              placeholder={AccountStatus.OPEN}
            />}
            {edittype===Edittype.EDIT&&values.status===AccountStatus.PASSED&&<Field
              label="Antragsdatum"
              date={values.passed}
              name="passed"
              component={PickField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />}
            {(values.status===AccountStatus.PASSED)&&<Field
              label="Antragsdatum"
              placeholder={initialValues.passed}
              name="passed"
              component={ShowField}
            />}
            {values.notes.map((note, index) => (
              <Field key={index}
                label={'Bescheid #' + (index+1)}
                placeholder={note.filename}
                name="note.Filename"
                component={ShowField}
              />
            ))}
            {(values.status===AccountStatus.CLOSED)&&(values.notes.length===0||addNote)&&<Field
              label="Bescheid"
              filedate={values.note}
              name="note"
              component={FilePickDateField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />}
            {(values.status===AccountStatus.CLOSED)&&!addNote&&<p>Bescheid</p>}
            {(values.status===AccountStatus.CLOSED)&&!addNote&&<Button type="button" style={styleButton} onClick={() => setAddNote(true)}>Anlegen</Button>}
            {(values.status===AccountStatus.CLOSED)&&<Field
              label="Betrag"
              placeholder="Betrag"
              name={`details[0].amount`}
              component={TextField}
            />}
            {(values.status===AccountStatus.CLOSED)&&<Field
              label="Erstattung"
              placeholder="Erstattung"
              name={`details[0].refund`}
              component={TextField}
            />}
            {(values.status===AccountStatus.CLOSED)&&<Field
              label="Ablehnung"
              placeholder="Ablehnung"
              name={`details[0].deny`}
              component={TextField}
            />}
            {(values.status===AccountStatus.CLOSED)&&<Field
              label="Selbstbehalt"
              placeholder="Selbstbehalt"
              name={`details[0].retension`}
              component={TextField}
            />}
            {(values.status===AccountStatus.CLOSED)&&<Field
              label="Selbstbehalt (Zahn)"
              placeholder="Selbstbehalt (Zahn)"
              name={`details[0].dent20`}
              component={TextField}
            />}
            {(values.status===AccountStatus.CLOSED)&&<Field
              label="Selbstbehalt (Heilmittel)"
              placeholder="Selbstbehalt (Heilmittel)"
              name={`details[0].cure10`}
              component={TextField}
            />}
            <Button style={styleButton} type="submit" disabled={!isValid}>Speichern</Button>
            <Button style={styleButton} type="button" onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountForm;
