import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { MovieformatNoID } from '../../../../../../backend/src/types/movie';

import { TextField } from '../../../basic/formfields/textfield';

import { newMovieformat } from '../../../../utils/movie/movieformat';

interface Props {
  onSubmit: (values: MovieformatNoID) => void;
  onCancel: () => void;
}

export const AddMovieformatForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const initialValues: MovieformatNoID = newMovieformat();

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
            <Menu compact stackable borderless style={{ background: backgroundColor }}>
              <Menu.Item>
                <Button type="submit" style={styleMainMenu} color="blue" disabled={!dirty || !isValid}>Speichern</Button>
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

export default AddMovieformatForm;
