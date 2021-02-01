import React from "react";
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { OwnershipNoID } from '../../../../../../backend/src/types/book';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { nextOwnership } from '../../../../utils/book/ownership';


interface Props {
  edittype: Edittype;
  onSubmit: (values: OwnershipNoID) => void;
  onCancel: () => void;
}

export const OwnershipForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const ownership = useSelector((state: RootState) => state.ownership);
  const ownerships = useSelector((state: RootState) => state.ownerships);

  const initialValues = (edittype===Edittype.EDIT && ownership) ? ownership : nextOwnership(ownerships);

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
            <Button style={styleButton} type='submit' disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OwnershipForm;
