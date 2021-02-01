import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { MovieformatNoID, Movieformat } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';

import { newMovieformat } from '../../../../utils/movie/movieformat';


interface Props {
  edittype: Edittype;
  onSubmit: (values: MovieformatNoID) => void;
  onCancel: () => void;
}

export const MovieformatForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const movieformat: Movieformat = useSelector((state: RootState) => state.movieformat);

  const initialValues = (edittype===Edittype.EDIT && movieformat) ? movieformat : newMovieformat();

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
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
         </Form>
        );
      }}
    </Formik>
  );
};

export default MovieformatForm;
