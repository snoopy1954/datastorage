import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Historyline, HistorylineNoID } from '../../../../../../backend/src/types/logging';

import { RootState } from '../../../../state/store';
import { addHistoryline } from  '../../../../state/info/historylines/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { HistoryModal } from '../HistoryModal';


export const HistoryPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const historylines = useSelector((state: RootState) => state.historylines);

  const openModal = (): void => setModalOpen(true);
    
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const actionAdd = async (values: HistorylineNoID) => {
    dispatch(addHistoryline(values));
    closeModal();
  };
   
  return (
    <div className="App">
      <HistoryModal
        title='Neuen Historyeintrag anlegen'
        modalOpen={modalOpen}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <AppHeaderH3 text='History' icon='list'/>
      <Button style={styleButton} onClick={() => openModal()}>Neu</Button>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Datum</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Version</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='ten wide center aligned'>Text</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(historylines).map((historyline: Historyline) => (
          <Table.Row key={historyline.id}>
            <Table.Cell>{historyline.date.name}</Table.Cell>
            <Table.Cell>{historyline.version}</Table.Cell>
            <Table.Cell>{historyline.text}</Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default HistoryPage;