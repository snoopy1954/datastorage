import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Edittype } from "../../../../types/basic";
import { BillNoID, Bill } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeBill, updateBill } from '../../../../state/axa/billlist/actions';
import { clearSelectedBill } from '../../../../state/axa/selectedbill/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddBillModal from "../AddBillModal";
import ShowModalPDF from "../../../basic/showModalPDF";


const BillDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean]>([false, false, false]);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const bill = useSelector((state: RootState) => state.bill);

  const pdfUrl = useSelector((state: RootState) => state.pdfurl);

  const openModalChange = (): void => setModalOpen([true, false, false]);
  const openModalDelete = (): void => setModalOpen([false, true, false]);
  const openModalShow = (): void => setModalOpen([false, false, true]);
  enum ModalDialog {
      CHANGE = 0,
      DELETE = 1,
      SHOW = 2
  }  
  const closeModal = (): void => {
      setModalOpen([false, false, false]);
      setError(undefined);
  };

  const handleClose = () => {
    dispatch(clearSelectedBill());
  };

  const  handleDelete = async () => {
    if (bill.id!=='') {
      dispatch(removeBill(bill.id));
      dispatch(clearSelectedBill());
    }
    closeModal();
    dispatch(setPage({ mainpage, subpage: 'bills' }));
  };

  const handleChangedBill = async (values: BillNoID) => {
    const billToUpdate: Bill = {
      id: bill.id,
      ...values
    };
    dispatch(updateBill(billToUpdate));
    closeModal();
    dispatch(clearSelectedBill());
    dispatch(setPage({ mainpage, subpage: 'bills' }));
  }

  const buttons: Item[] = 
  [
    {
      name: 'Schliessen',
      title: 'Schliessen',
      color: 'blue',
      onClick: handleClose
    },
    {
      name: 'Ändern',
      title: 'Ändern',
      color: 'blue',
      onClick: openModalChange
    },
    {
      name: 'Anzeigen',
      title: 'Anzeigen',
      color: 'blue',
      onClick: openModalShow
    },
    {
      name: 'Löschen',
      title: 'Löschen',
      color: 'red',
      onClick: openModalDelete
    },
  ];

  return (
    <div className="App">
      <AppHeaderH3Plus text={'Rechnung ' + bill.name} icon='zoom-in'/>
      <AddBillModal
          edittype={Edittype.EDIT}
          modalOpen={modalOpen[ModalDialog.CHANGE]}
          onSubmit={handleChangedBill} 
          error={error}
          onClose={closeModal}
      />
      <AskModal
          header='Rechnug löschen'
          prompt={'Rechnung ' + bill.name}
          modalOpen={modalOpen[ModalDialog.DELETE]}
          onSubmit={handleDelete}
          onClose={closeModal}
      />
      {pdfUrl!==''&&<ShowModalPDF
          title={bill.notes[0].filename}
          pdfUrl={pdfUrl}
          modalOpen={modalOpen[ModalDialog.SHOW]}
          onClose={closeModal}
      />}
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parametername</Table.HeaderCell>
            <Table.HeaderCell>Wert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{bill.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Abrechnung</Table.Cell>
            <Table.Cell>{bill.accountID}</Table.Cell>
          </Table.Row>
          {pdfUrl!==''&&<Table.Row>
            <Table.Cell>Rechnung</Table.Cell>
            <Table.Cell>{bill.notes[0].filename}</Table.Cell>
          </Table.Row>}
        </Table.Body>
      </Table>
   </div>
  );
}

export default BillDetailsPage;