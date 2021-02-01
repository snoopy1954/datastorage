import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from "formik";
import { styleButton } from '../../../constants';

import { TextField } from "../formfields/textfield";

interface Props {
  header: string;
  prompt: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Value) => void;
};

export interface Value {
  value: string;
};

interface AskProps {
  prompt: string;
  onClose: () => void;
  onSubmit: (values: Value) => void;  
};

export const AskString = ({ header, prompt, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>
      <AskStringForm prompt={prompt} onSubmit={onSubmit} onClose={onClose} />
    </Modal.Content>
    </Modal>
);
  
const AskStringForm: React.FC<AskProps> = ({ prompt, onSubmit, onClose }) => {
    return (
      <Formik
        initialValues={{
          value: ""
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.value) {
            errors.value = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty }) => {
          return (
            <Form className="form ui">
              <Field
                label={prompt}
                placeholder={prompt}
                name="value"
                component={TextField}
              />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Auswählen</Button>
            <Button style={styleButton} onClick={() => onClose()}>Abbrechen</Button>
            </Form>
          );
        }}
      </Formik>
    );
};  

export default AskString;