import React from "react";
import { useSelector } from 'react-redux';
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { Edittype, Option } from "../../../../types/basic";
import { AccountNoID } from '../../../../../../backend/src/types/axa';
import { AccountStatus } from '../../../../types/axa';

import { RootState } from '../../../../state/store';

import { ShowField } from '../../../basic/formfields/showfield';
import { PickField } from '../../../basic/formfields/pickdatefield';
import { SelectField } from '../../../basic/formfields/selectfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { getCurrentDate, isValidDate } from '../../../../utils/basic';
import { newAccount } from '../../../../utils/axa/account';


interface Props {
  edittype: Edittype;
  onSubmit: (values: AccountNoID) => void;
  onCancel: () => void;
}

export const AddAccountForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const account = useSelector((state: RootState) => state.account);
  const accounts = useSelector((state: RootState) => state.accounts);

  const statusOptions: Option[] = [];
  Object.values(AccountStatus).forEach(statusvalue => {
    statusOptions.push({
      value: statusvalue,
      label: statusvalue
    })
  });

  const initialValues = (edittype===Edittype.EDIT && account) ? account : newAccount(accounts);
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
              placeholder={initialValues.name}
              name="name.name"
              component={ShowField}
            />}
            <Field
              name={`details[0].year`}
              placeholder="Jahr"
              type="text"
            />
            <Field
              label="Seqnr"
              placeholder="Seqnr"
              name="name.seqnr"
              component={NumberField}
              min='0'
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
