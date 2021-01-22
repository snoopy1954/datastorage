import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButtonSmall, styleButton } from '../../../../constants';

import { Biller, BillerNoID } from '../../../../../../backend/src/types/axa';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addBiller, removeBiller, updateBiller, exchangeBillers } from  '../../../../state/axa/billerlist/actions';
import { clearSelectedBiller, setSelectedBiller } from '../../../../state/axa/selectedbiller/actions';
import { addChangedBiller, clearChangedBiller } from '../../../../state/axa/changedbillerlist/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { BillerModal } from '../BillerModal';

import { sortBillerList } from '../../../../utils/axa/biller';


export const BillerPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const billers = useSelector((state: RootState) => state.billers);
  const biller = useSelector((state: RootState) => state.biller);
  const changedBillers: Biller[] = useSelector((state: RootState) => state.changedbillers);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
  const openModalDelete = (biller: Biller): void => {
    dispatch(setSelectedBiller(biller));
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (biller: Biller): void => {
    dispatch(setSelectedBiller(biller));
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (biller: Biller): void => {
    dispatch(setSelectedBiller(biller));
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

  const actionSaveSequence = () => {
    Object.values(changedBillers).forEach(changedBiller => {
        dispatch(updateBiller(changedBiller));
    });
    dispatch(clearChangedBiller());
  };

  const actionAdd = async (values: BillerNoID) => {
    dispatch(addBiller(values));
    closeModal();
  };

  const actionChange = async (values: BillerNoID) => {
    const billerToChange: Biller = {
      ...values,
      id: biller.id
    };
    dispatch(updateBiller(billerToChange));
    dispatch(clearSelectedBiller());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeBiller(biller.id));
    dispatch(clearSelectedBiller());
    closeModal();
  };  

  const actionShow = () => {
    dispatch(clearSelectedBiller());
    closeModal();
  };  

  const actionUpDown = (direction: string, index: number, list: Biller[]) => {
    if ((direction===Direction.UP && index===0) || (direction===Direction.DOWN && index===list.length-1)) return;

    const biller1: Biller = list[index]; 
    const biller2: Biller = direction===Direction.UP ? list[index-1] : list[index+1];
    const seqnr1 = biller1.name.seqnr;
    const seqnr2 = biller2.name.seqnr;
    biller1.name.seqnr = seqnr2;
    biller2.name.seqnr = seqnr1;
    const billersToChange: Biller[] = [biller1, biller2];
    dispatch(exchangeBillers(billersToChange));
    dispatch(addChangedBiller(biller1));
    dispatch(addChangedBiller(biller2));
  };

  const sortedBillers = sortBillerList(billers);
   
  return (
    <div className="App">
      <BillerModal
        edittype={Edittype.ADD}
        title='Neuen Rechnungssteller anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <BillerModal
        edittype={Edittype.SHOW}
        title={`Rechnungssteller ${biller.name.name} anzeigen`}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <BillerModal
        edittype={Edittype.EDIT}
        title={'Rechnungssteller ' + biller.name.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Rechnungssteller löschen'
        prompt={'Rechnungssteller ' + biller.name.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Rechnungssteller' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      {Object.values(changedBillers).length>0&&<Button style={styleButton} onClick={() => actionSaveSequence()}>Speichern</Button>}
       <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Person</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Auf/Ab</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(sortedBillers).map((biller: Biller, index: number) => (
            <Table.Row key={biller.id}>
              <Table.Cell>{biller.name.name}</Table.Cell>
              <Table.Cell>{biller.person}</Table.Cell>
              <Table.Cell>
                <Button className="ui icon button" style={styleButtonSmall} 
                    onClick={() => actionUpDown(Direction.UP, index, sortedBillers)}>
                  <i className="angle up icon"></i>
                </Button>
                <Button className="ui icon button" style={styleButtonSmall}
                    onClick={() => actionUpDown(Direction.DOWN, index, sortedBillers)}>
                  <i className="angle down icon"></i>
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(biller)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(biller)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(biller)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default BillerPage;