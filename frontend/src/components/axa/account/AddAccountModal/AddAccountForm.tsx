import React from "react";
import { useSelector } from 'react-redux';
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Edittype } from "../../../../types/basic";
import { AccountNoID } from '../../../../../../backend/src/types/axa';
import { AccountStatus } from '../../../../types/axa';

import { RootState } from '../../../../state/store';

import { TextField, SelectField, AccountStatusOption, ShowField } from "./FormField";
import { PickField } from '../../../basic/formfields/pickdate';

import { newAccount, getCurrentDate } from '../../../../utils/axa';
import { backgroundColor, styleMainMenu } from "../../../../constants";
import { isValidDate } from '../../../../utils/basic';

interface Props {
  edittype: Edittype;
  onSubmit: (values: AccountNoID) => void;
  onCancel: () => void;
}

export const AddAccountForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const account = useSelector((state: RootState) => state.account);

  const statusOptions: AccountStatusOption[] = [];
  Object.values(AccountStatus).forEach(statusvalue => {
    statusOptions.push({
      value: statusvalue,
      label: statusvalue
    })
  });

  const initialValues = (edittype===Edittype.EDIT && account) ? account : newAccount();
  if (edittype===Edittype.EDIT && initialValues.passed==='') initialValues.passed = getCurrentDate();
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        console.log(values.status, values.passed)
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
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            {edittype===Edittype.EDIT&&<SelectField
              label="Status"
              name="status"
              prompt="Bitte Status auswählen"
              options={statusOptions}
            />}
            {edittype===Edittype.ADD&&<Field
              label="Status"
              name="status"
              component={ShowField}
              placeholder={AccountStatus.OPEN}
            />}
            {edittype===Edittype.EDIT&&<Field
              label="Antragsdatum"
              date={values.passed}
              name="passed"
              component={PickField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />}
            {edittype===Edittype.ADD&&<Field
              label="Antragsdatum"
              name="passed"
              component={ShowField}
              placeholder=''
            />}
            <Menu compact stackable borderless style={{ background: backgroundColor }}>
              <Menu.Item>
                <Button type="submit" style={styleMainMenu} color="blue" disabled={!isValid}>Speichern</Button>
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

export default AddAccountForm;
