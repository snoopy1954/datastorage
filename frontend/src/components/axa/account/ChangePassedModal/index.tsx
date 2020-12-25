import React from 'react';
import { Segment, Modal, Menu, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from "formik";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { AccountStatus } from '../../../../types/axa';

import { ShowField } from '../../../basic/formfields/showfield'; 
import { PickField } from '../../../basic/formfields/pickdatefield'; 

interface Props {
    title: string;
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Passed) => void;
    error?: string;
};

export interface Passed {
    status: AccountStatus;
    passed: string;
};

interface AskProps {
    onClose: () => void;
    onSubmit: (values: Passed) => void;  
};

export const AskPassedModal = ({ title, modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AskPassedForm onSubmit={onSubmit} onClose={onClose} />
      </Modal.Content>
    </Modal>
);

const AskPassedForm: React.FC<AskProps> = ({ onSubmit, onClose }) => {
    return (
      <Formik
        initialValues={{
          status: AccountStatus.PASSED,
          passed: ''
        }}
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
              label="Status"
              name="status"
              component={ShowField}
              placeholder={AccountStatus.PASSED}
            />
            <Field
              label="Antragsdatum"
              date={values.passed}
              name="passed"
              component={PickField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Menu compact stackable borderless style={{ background: backgroundColor }}>
              <Menu.Item>
                <Button type="submit" style={styleMainMenu} color="blue" disabled={!isValid}>Speichern</Button>
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

  export default AskPassedModal;