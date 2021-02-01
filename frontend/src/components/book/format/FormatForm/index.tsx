import React from "react";
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { FormatNoID } from '../../../../../../backend/src/types/book';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { nextFormat } from '../../../../utils/book/format';


interface Props {
  edittype: Edittype;
  onSubmit: (values: FormatNoID) => void;
  onCancel: () => void;
}

export const FormatForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const format = useSelector((state: RootState) => state.format);
  const formats = useSelector((state: RootState) => state.formats);

  const initialValues = (edittype===Edittype.EDIT && format) ? format : nextFormat(formats);

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
          <Form className='form ui'>
            <Field
              label='Name'
              placeholder='Name'
              name='name'
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

export default FormatForm;
