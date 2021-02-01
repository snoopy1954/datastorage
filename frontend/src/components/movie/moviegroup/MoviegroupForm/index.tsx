import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { MoviegroupNoID } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { SubgroupsFieldArray } from './subgroupsfieldarray';

import { newMoviegroup } from '../../../../utils/movie/moviegroup';


interface Props {
  edittype: Edittype;
  onSubmit: (values: MoviegroupNoID) => void;
  onCancel: () => void;
}

export const MoviegroupForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const moviegroup = useSelector((state: RootState) => state.moviegroup);      

  const initialValues = (edittype===Edittype.EDIT && moviegroup) ? moviegroup : newMoviegroup();

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
            <SubgroupsFieldArray
              subgroups={values.subgroups}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MoviegroupForm;
