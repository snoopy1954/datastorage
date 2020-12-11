import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";

import { Edittype } from "../../../../types/basic";
import { BillNoID, Bill } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeBill, updateBill } from '../../../../state/axa/billlist/actions';
import { clearSelectedBill } from '../../../../state/axa/selectedbill/actions';
import { getOne } from '../../../../services/image/images';
import { setPdfUrl } from "../../../../state/axa/pdfUrl/actions";

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { getImageUrl } from "../../../../utils/image";

import AddBillModal from "../AddBillModal";
import ShowModalPDF from "../../../basic/showModalPDF";


const BillDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean]>([false, false, false]);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const bill = useSelector((state: RootState) => state.bill);
  const account = useSelector((state: RootState) => state.account);
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

  const handleSelection = (index: number) => {
    const id = bill.notes[index].dataId;
    const fetchImage = async () => {
      const newImage = await getOne(id);
      dispatch(setPdfUrl(await getImageUrl(newImage)));
    };
    fetchImage();
    openModalShow();
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
            <Table.Cell>Betrag</Table.Cell>
            <Table.Cell>{bill.details[0].amount}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Rechnungssteller</Table.Cell>
            <Table.Cell>{bill.invoicingparty}</Table.Cell>
          </Table.Row>
         {bill.notes.length>0&&<Table.Row onClick={() => handleSelection(0)}>
            <Table.Cell>Rechnung</Table.Cell>
            <Table.Cell><Button color='blue' onClick={() => handleSelection(0) }>Anzeigen</Button>{bill.notes[0].received}</Table.Cell>
          </Table.Row>}
          {bill.notes.length>1&&<Table.Row onClick={() => handleSelection(1)}>
            <Table.Cell>Quittung</Table.Cell>
            <Table.Cell><Button color='blue' onClick={() => handleSelection(1) }>Anzeigen</Button>{bill.notes[1].received}</Table.Cell>
          </Table.Row>}
          <Table.Row>
            <Table.Cell>Abrechnung</Table.Cell>
            <Table.Cell><Button color='blue' onClick={() => handleSelection(2) }>Anzeigen</Button>{account.name}</Table.Cell>
          </Table.Row>
         </Table.Body>
      </Table>
   </div>
  );
}

export default BillDetailsPage;