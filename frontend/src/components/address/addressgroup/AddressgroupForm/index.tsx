import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { AddressgroupNoID } from '../../../../../../backend/src/types/address';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { newAddressgroup } from '../../../../utils/address/addressgroup';


interface Props {
  edittype: Edittype;
  onSubmit: (values: AddressgroupNoID) => void;
  onCancel: () => void;
}

export const AddressgroupForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const addressgroup = useSelector((state: RootState) => state.addressgroup);      

  const initialValues = (edittype===Edittype.EDIT && addressgroup) ? addressgroup : newAddressgroup();

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
              name="groupname.name"
              component={TextField}
            />
            <Field
              label="Kommentar"
              placeholder="Kommentar"
              name="comment"
              component={TextField}
            />
            <Field
              label="Reihenfolge"
              placeholder="Reihenfolge"
              name="groupname.seqnr"
              component={NumberField}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddressgroupForm;
