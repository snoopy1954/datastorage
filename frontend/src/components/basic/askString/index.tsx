import React from 'react';
import { Segment, Modal, Menu, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from "formik";
import { backgroundColor, styleMainMenu } from "../../../constants";

import { TextField } from "../formfields/textfield";

interface Props {
  header: string;
  prompt: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Value) => void;
  error?: string;
};

export interface Value {
    value: string;
};

interface AskProps {
    prompt: string;
    onClose: () => void;
    onSubmit: (values: Value) => void;  
};

export const AskString = ({ header, prompt, modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
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
              <Menu compact stackable borderless style={{ background: backgroundColor }}>
                <Menu.Item>
                  <Button type="submit" style={styleMainMenu} color="blue" disabled={!dirty || !isValid}>Speichern</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button type="button" style={styleMainMenu} onClick={onClose} color="blue">Abbrechen</Button>
                </Menu.Item>
              </Menu>
            </Form>
          );
        }}
      </Formik>
    );
  };
  

export default AskString;