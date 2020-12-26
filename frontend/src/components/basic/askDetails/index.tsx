import React from 'react';
import { Segment, Modal, Menu, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from "formik";
import { backgroundColor, styleMainMenu } from "../../../constants";
import { Details } from '../../../../../backend/src/types/axa';

import { TextField } from "../formfields/textfield";

interface Props {
  header: string;
  prompt: string;
  details: Details;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Details) => void;
  error?: string;
};

interface AskProps {
    details: Details;
    onClose: () => void;
    onSubmit: (values: Details) => void;  
};

export const AskDetails = ({ header, prompt, details, modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AskDetailsForm details={details} onSubmit={onSubmit} onClose={onClose} />
      </Modal.Content>
    </Modal>
);
  
const AskDetailsForm: React.FC<AskProps> = ({ details, onSubmit, onClose }) => {
    return (
      <Formik
        initialValues={details}
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
                label="Jahr"
                placeholder="Jahr"
                name="year"
                component={TextField}
              />
              <Field
                label="Betrag"
                placeholder="Betrag"
                name="amount"
                component={TextField}
              />
              <Field
                label="Erstattung"
                placeholder="Erstattung"
                name="refund"
                component={TextField}
              />
              <Field
                label="Ablehnung"
                placeholder="Ablehnung"
                name="deny"
                component={TextField}
              />
              <Field
                label="Selbstbehalt"
                placeholder="Selbstbehalt"
                name="retension"
                component={TextField}
              />
              <Field
                label="Selbstbehalt (Zahn)"
                placeholder="Selbstbehalt (Zahn)"
                name="dent20"
                component={TextField}
              />
              <Field
                label="Selbstbehalt (Heilmittel)"
                placeholder="Selbstbehalt (Heilmittel)"
                name="cure10"
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
  

export default AskDetails;