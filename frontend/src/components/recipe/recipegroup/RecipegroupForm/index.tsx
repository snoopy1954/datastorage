import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { GroupNoID } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { TextFieldArray } from '../../../basic/formfields/textfieldarray';

import { nextGroup } from '../../../../utils/basic/group';


interface Props {
  edittype: Edittype;
  onSubmit: (values: GroupNoID) => void;
  onCancel: () => void;
}

export const RecipegroupForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const recipegroups = useSelector((state: RootState) => state.recipegroups);      
  const recipegroup = useSelector((state: RootState) => state.recipegroup);      

  const initialValues = (edittype===Edittype.EDIT && recipegroup) ? recipegroup : nextGroup(recipegroups);

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

export default RecipegroupForm;