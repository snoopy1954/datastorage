import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Historyline, HistorylineNoID, Info } from '../../../../../../backend/src/types/logging';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addHistoryline, updateHistoryline, removeHistoryline } from  '../../../../state/info/historylines/actions';
import { updateInfo } from  '../../../../state/info/infos/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { HistoryModal } from '../HistoryModal';

import { sortHistorylines, emptyHistoryline } from '../../../../utils/info/historyline';


export const HistoryPage: React.FC = () => {
  const [historyline, setHistoryline] = React.useState<Historyline>(emptyHistoryline());
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);

  const dispatch = useDispatch();

  const historylines: Historyline[] = useSelector((state: RootState) => state.historylines);
  const infos = useSelector((state: RootState) => state.infos);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
  const openModalDelete = (historyline: Historyline): void => {
    setHistoryline(historyline);
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (historyline: Historyline): void => {
    setHistoryline(historyline);
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (historyline: Historyline): void => {
    setHistoryline(historyline);
    setModalOpen([false, false, false, true]);
  };

  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
  };

  const closeModal = (): void => {
    setModalOpen([false, false, false, false]);
  };

  const actionAdd = async (values: HistorylineNoID) => {
    dispatch(addHistoryline(values));
    const infosToUpdate: Info = {
      id: infos.id,
      date: values.date.name,
      version: values.version
    };
    dispatch(updateInfo(infosToUpdate));
    closeModal();
  };

  const actionChange = async (values: HistorylineNoID) => {
    const historylineToChange: Historyline = {
      ...values,
      id: historyline.id
    };
    dispatch(updateHistoryline(historylineToChange));
    setHistoryline(emptyHistoryline());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeHistoryline(historyline.id));
    setHistoryline(emptyHistoryline());
    closeModal();
  };  

  const actionShow = () => {
    setHistoryline(emptyHistoryline());
    closeModal();
  };

  const sortedHistorylines = sortHistorylines(historylines);

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Datum</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Version</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '50%' }} className='center aligned'>Text</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(sortedHistorylines).map((historyline: Historyline, index: number) => (
            <Table.Row key={historyline.id}>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='left aligned'>{historyline.date.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='left aligned'>{historyline.version}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '50%' } } className='left aligned'>{historyline.text}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(historyline)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(historyline)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(historyline)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
  };

   
  return (
    <div className="App">
      <HistoryModal
        edittype={Edittype.ADD}
        title='Neuen Historyeintrag anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        historyline={historyline}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <HistoryModal
        edittype={Edittype.SHOW}
        title={'Historyeintrag ' + historyline.date.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        historyline={historyline}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <HistoryModal
        edittype={Edittype.EDIT}
        title={'Historyeintrag ' + historyline.date.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        historyline={historyline}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Historyeintrag löschen'
        prompt={'Historyeintrag ' + historyline.date.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='History' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      {Object.values(sortedHistorylines).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(sortedHistorylines).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
          </Table>
        </div>
      }
      {Object.values(sortedHistorylines).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default HistoryPage;