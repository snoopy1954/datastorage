import React from 'react';
import { Container, Modal, Button } from 'semantic-ui-react';

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
        <Container textAlign="left">
          <h4>{prompt}</h4>
          <br></br>
        </Container>   
        <Container textAlign="left">
          <Button type="button" onClick={onClose} color="blue" style={{ height: '40px', width: '80px' }}>
            Nein
          </Button>
          <Button type="button" onClick={onSubmit} color="blue" style={{ height: '40px', width: '80px' }}>
            Ja
          </Button>
        </Container>   
      </Modal.Content>
    </Modal>
  )};

export default AskModal;
