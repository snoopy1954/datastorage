import React from 'react';
import { Container, Modal, Button, Image } from 'semantic-ui-react';

interface Props {
  title: string;
  imageUrl: string;
  modalOpen: boolean;
  onClose: () => void;
}

// https://stackoverflow.com/questions/45596329/display-pdf-in-reactjs

export const ShowModal = ({ title, imageUrl, modalOpen, onClose }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Container textAlign="left">
          <Image className="open-new-window" width="300" src={imageUrl}/>
          <br></br>
          <Button type="button" onClick={onClose} color="blue" style={{ height: '40px', width: '100px' }}>
            Schliessen
          </Button>
        </Container>   
      </Modal.Content>
    </Modal>
  )};

export default ShowModal;
