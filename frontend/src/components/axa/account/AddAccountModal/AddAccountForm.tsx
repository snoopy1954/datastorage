import React from "react";
import { useSelector } from 'react-redux';
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Edittype } from "../../../../types/basic";
import { AccountNoID } from '../../../../../../backend/src/types/axa';
import { AccountStatus } from '../../../../types/axa';

import { RootState } from '../../../../state/store';

import { TextField, SelectField, AccountStatusOption } from "./FormField";

import { newAccount } from '../../../../utils/axa';
import { backgroundColor, styleMainMenu } from "../../../../constants";


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
            <SelectField
              label="Status"
              prompt="Bitte Status auswählen"
              name="status"
              options={statusOptions}
            />
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
