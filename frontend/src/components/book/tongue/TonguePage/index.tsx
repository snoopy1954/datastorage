import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';

import { Tongue, TongueNoID } from '../../../../../../backend/src/types/book';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addTongue, removeTongue, updateTongue } from '../../../../state/book/tonguelist/actions';
import { setSelectedTongue, clearSelectedTongue } from '../../../../state/book/selectedtongue/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { TongueModal } from '../TongueModal';


export const TonguePage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const tongues = useSelector((state: RootState) => state.tongues);
  const tongue = useSelector((state: RootState) => state.tongue);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (tongue: Tongue): Promise<void> => {
    dispatch(setSelectedTongue(tongue));
    setModalOpen([false, true, false, false]);
  };
     
  const openModalChange = async (tongue: Tongue): Promise<void> => {
    dispatch(setSelectedTongue(tongue));
    setModalOpen([false, false, true, false]);
  };
 
  const openModalShow = async (tongue: Tongue): Promise<void> => {
    dispatch(setSelectedTongue(tongue));
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

  const actionAdd = async (values: TongueNoID) => {
    dispatch(addTongue(values));
    closeModal();
  };
    
  const actionShow = () => {
    dispatch(clearSelectedTongue());
    closeModal();
  };  
  
  const actionChange = async (values: TongueNoID) => {
    const tongueToChange: Tongue = {
      ...values,
      id: tongue.id
    };
    dispatch(updateTongue(tongueToChange));
    dispatch(clearSelectedTongue());
    closeModal();
  };
  
  const actionDelete = () => {
    dispatch(removeTongue(tongue.id));
    dispatch(clearSelectedTongue());
    closeModal();
  };  

  return (
    <div className='App'>
      <TongueModal
        edittype={Edittype.ADD}
        title='Neue Sprache anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <TongueModal
        edittype={Edittype.SHOW}
        title={'Sprache ' + tongue.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <TongueModal
        edittype={Edittype.EDIT}
        title={'Sprache ' + tongue.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Sprache löschen'
        prompt={'Sprache ' + tongue.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Sprachen' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='ten wide center aligned' style={{ backgroundColor}} >Name</Table.HeaderCell>
            <Table.HeaderCell className='four wide center aligned' style={{ backgroundColor}} >Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(tongues).map((tongue: Tongue) => (
            <Table.Row key={tongue.id}>
              <Table.Cell>{tongue.name}</Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(tongue)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(tongue)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(tongue)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default TonguePage;