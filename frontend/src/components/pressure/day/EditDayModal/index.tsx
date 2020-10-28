import React from 'react';
import { Segment, Modal } from 'semantic-ui-react';

import EditDayForm from './EditDayForm';
import { Day } from '../../../../../../backend/src/types/pressure';

interface Props {
  dayTitle: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Day) => void;
  error?: string;
}

const EditDayModal = ({ dayTitle, modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Tageswerte für {dayTitle} ändern</Modal.Header>
      <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <EditDayForm onSubmit={onSubmit} onCancel={onClose}/>
      </Modal.Content>
    </Modal>
);

export default EditDayModal;
