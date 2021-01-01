import React from 'react';
import { Segment, Modal, Menu, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from "formik";

import { backgroundColor, styleMainMenu } from "../../../constants";
import { FileDate } from '../../../types/axa';

import { FilePickDateField } from '../../basic/formfields/filepickdatefield';

import { newFiledate } from '../../../utils/basic';


export interface NewFiledate {
    filedate: FileDate;
};

interface Props {
    title: string;
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: NewFiledate) => void;
    error?: string;
};

interface AskProps {
    onClose: () => void;
    onSubmit: (values: NewFiledate) => void;  
};

export const AskFiledateModal = ({ title, modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AskFiledateForm onSubmit={onSubmit} onClose={onClose} />
      </Modal.Content>
    </Modal>
);

const AskFiledateForm: React.FC<AskProps> = ({ onSubmit, onClose }) => {
    const filedate: FileDate = newFiledate();

    return (
      <Formik
        initialValues={{
          filedate: filedate
        }}
        onSubmit={onSubmit}
        validate={values => {
          console.log(values)
          const errors: { [field: string]: string } = {};
          return errors;
        }}
      >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Bescheid"
              filedate={values.filedate}
              name="filedate"
              component={FilePickDateField}
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

  export default AskFiledateModal;