import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { Format, FormatNoID } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';

import { TextField } from '../../formfields/textfield';
import { NumberField } from '../../formfields/numberfield';

import { nextFormat } from '../../../../utils/basic/format';


interface Props {
  edittype: Edittype;
  format: Format;
  onSubmit: (values: FormatNoID) => void;
  onCancel: () => void;
};

export const FormatForm: React.FC<Props> = ({ edittype, format, onSubmit, onCancel }) => {
  const formats: Format[] = useSelector((state: RootState) => state.formats);      

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
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormatForm;
