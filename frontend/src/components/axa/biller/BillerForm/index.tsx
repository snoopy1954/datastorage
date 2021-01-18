import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { BillerNoID, Biller } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { newBiller } from '../../../../utils/axa/biller';


interface Props {
  edittype: Edittype;
  onSubmit: (values: BillerNoID) => void;
  onCancel: () => void;
}

export const AddBillerForm: React.FC<Props> = ({ edittype,  onSubmit, onCancel }) => {
  const biller: Biller = useSelector((state: RootState) => state.biller);
  const billers: Biller[] = useSelector((state: RootState) => state.billers);

  const initialValues = (edittype===Edittype.EDIT && biller) ? biller : newBiller(billers);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name.name) {
          errors.name = requiredError;
        }
        if (!values.name.name) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Seqnr"
              placeholder="Seqnr"
              name="name.seqnr"
              component={NumberField}
              min='0'
            />
            <Field
              label="Name"
              placeholder="Name"
              name="name.name"
              component={TextField}
            />
            <Field
              label="Person"
              placeholder="Person"
              name="person"
              component={TextField}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddBillerForm;
