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
  onSubmit: (values: Amount) => void;
  error?: string;
};

interface Amount {
    amount: string;
};

interface AskProps {
    onClose: () => void;
    onSubmit: (values: Amount) => void;  
};

export const AskAmount = ({ header, prompt, modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AskAmountForm onSubmit={onSubmit} onClose={onClose} />
      </Modal.Content>
    </Modal>
);
  
const AskAmountForm: React.FC<AskProps> = ({ onSubmit, onClose }) => {
    return (
      <Formik
        initialValues={{
          amount: ""
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.amount) {
            errors.amount = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty }) => {
          return (
            <Form className="form ui">
              <Field
                label="Betrag"
                placeholder="Betrag"
                name="amount"
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
  

export default AskAmount;