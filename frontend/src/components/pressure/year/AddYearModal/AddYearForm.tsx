import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useSelector } from 'react-redux';
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { Edittype } from "../../../../types/basic";
import { YearNoID, Year } from '../../../../../../backend/src/types/pressure';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { BooleanField } from '../../../basic/formfields/booleanfield';

import { newYear } from '../../../../utils/pressure';


interface Props {
  edittype: Edittype;
  onSubmit: (values: YearNoID) => void;
  onCancel: () => void;
}

export const AddYearForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const years: Year[] = useSelector((state: RootState) => state.yearlist);
  const year: Year = useSelector((state: RootState) => state.selectedyear);

  const initialValues = edittype===Edittype.EDIT ? year : newYear(years);

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
        return errors;
      }}
    >
      {({ isValid }) => {
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
              label="letzter Monat"
              placeholder="letzter Monat"
              name="lastMonth"
              component={NumberField}
              min='0'
            />
            <Field
              label="letztes Jahr"
              placeholder="letztes Jahr"
              name="isLastYear"
              component={BooleanField}
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

export default AddYearForm;
