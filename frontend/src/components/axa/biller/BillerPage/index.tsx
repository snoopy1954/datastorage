import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButtonSmall, styleButton } from '../../../../constants';

import { Biller, BillerNoID } from '../../../../../../backend/src/types/axa';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addBiller, removeBiller, updateBiller, exchangeBillers } from  '../../../../state/axa/billers/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { BillerModal } from '../BillerModal';

import { sortBillerList, emptyBiller } from '../../../../utils/axa/biller';


export const BillerPage: React.FC = () => {
  const [biller, setBiller] = React.useState<Biller>(emptyBiller());
  const [billersChanged, setBillersChanged] = React.useState<Array<Biller>>([]);
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);

  const dispatch = useDispatch();

  const billers = useSelector((state: RootState) => state.billers);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
  const openModalDelete = (biller: Biller): void => {
    setBiller(biller);
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (biller: Biller): void => {
    setBiller(biller);
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (biller: Biller): void => {
    setBiller(biller);
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
    Object.values(billersChanged).forEach(billerChanged => {
        dispatch(updateBiller(billerChanged));
    });
    setBillersChanged([]);
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
    setBiller(emptyBiller());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeBiller(biller.id));
    setBiller(emptyBiller());
    closeModal();
  };  

  const actionShow = () => {
    setBiller(emptyBiller());
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
    setBillersChanged(arr => [...arr, biller1]);
    setBillersChanged(arr => [...arr, biller2]);
  };

  const sortedBillers = sortBillerList(billers);
  console.log(sortedBillers, sortedBillers.length)

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '25%' } } className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '25%' }} className='center aligned'>Person</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Auf/Ab</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(sortedBillers).map((biller: Biller, index: number) => (
            <Table.Row key={biller.id}>
              <Table.Cell style={{ backgroundColor, width: '25%' } } className='left aligned'>{biller.name.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '25%' } } className='left aligned'>{biller.person}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='center aligned'>
                <Button className="ui icon button" style={styleButtonSmall} 
                  onClick={() => actionUpDown(Direction.UP, index, sortedBillers) }>
                  <i className="angle up icon"></i>
                </Button>
                <Button className="ui icon button" style={styleButtonSmall} 
                  onClick={() => actionUpDown(Direction.DOWN, index, sortedBillers) }>
                  <i className="angle down icon"></i>
                </Button>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(biller)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(biller)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(biller)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
  };
   
  return (
    <div className="App">
      <BillerModal
        edittype={Edittype.ADD}
        title='Neuen Rechnungssteller anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        biller={biller}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <BillerModal
        edittype={Edittype.SHOW}
        title={`Rechnungssteller ${biller.name.name} anzeigen`}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        biller={biller}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <BillerModal
        edittype={Edittype.EDIT}
        title={'Rechnungssteller ' + biller.name.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        biller={biller}
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
      {Object.values(billersChanged).length>0&&<Button style={styleButton} onClick={() => actionSaveSequence()}>Speichern</Button>}
      {sortedBillers.length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {sortedBillers.length>8&&
          <div style={{ overflowY: 'scroll', height: '550px' }}>
            <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
              <ShowTableBody/>
            </Table>
          </div>
      }
      {sortedBillers.length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
          <ShowTableHeader/>
          <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default BillerPage;