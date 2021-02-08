import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { BookgroupNoID } from '../../../../../../backend/src/types/book';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { TextFieldArray } from '../../../basic/formfields/textfieldarray';

import { newBookgroup } from '../../../../utils/book/bookgroup';


interface Props {
  edittype: Edittype;
  onSubmit: (values: BookgroupNoID) => void;
  onCancel: () => void;
}

export const BookgroupForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const bookgroup = useSelector((state: RootState) => state.bookgroup);      

  const initialValues = (edittype===Edittype.EDIT && bookgroup) ? bookgroup : newBookgroup();

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
           <Field
              label='Reihenfolge'
              placeholder='Reihenfolge'
              name='seqnr'
              component={NumberField}
            />
            <Field
              name='subgroups'
              items={values.subgroups}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={TextFieldArray}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BookgroupForm;
