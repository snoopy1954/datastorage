import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { HistorylineNoID, Historyline } from '../../../../../../backend/src/types/logging';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { newHistoryline } from '../../../../utils/info/historyline';


interface Props {
  edittype: Edittype;
  onSubmit: (values: HistorylineNoID) => void;
  onCancel: () => void;
}

export const HistorylineForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const historylines: Historyline[] = useSelector((state: RootState) => state.historylines);
  const historyline: Historyline = useSelector((state: RootState) => state.historyline);

  const initialValues = (edittype===Edittype.EDIT && historyline.id!=='') ? historyline : newHistoryline(historylines);;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date.name) {
          errors.name = requiredError;
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
              name="date.seqnr"
              component={NumberField}
              min='0'
            />
            <Field
              label="Name"
              placeholder="Name"
              name="date.name"
              component={TextField}
            />
            <Field
              label="Version"
              placeholder="Version"
              name="version"
              component={TextField}
            />
            <Field
              label="Text"
              placeholder="Text"
              name="text"
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

export default HistorylineForm;
