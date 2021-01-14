import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { styleButton } from '../../../constants';

interface Props {
  header: string;
  prompt: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const AskModal = ({ header, prompt, modalOpen, onClose, onSubmit }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <h4>{prompt}</h4>
        <br></br>
        <Button style={styleButton} onClick={() => onSubmit()}>Ja</Button>
        <Button style={styleButton} onClick={() => onClose()}>Nein</Button>
      </Modal.Content>
    </Modal>
  )};

export default AskModal;
