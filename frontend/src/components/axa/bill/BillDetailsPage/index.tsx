import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";

import { Edittype } from "../../../../types/basic";
import { BillNoID, Bill, Note } from '../../../../../../backend/src/types/axa';
import { Content } from '../../../../../../backend/src/types/image';

import { create2 } from "../../../../services/image/images";

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeBill, updateBill } from '../../../../state/axa/billlist/actions';
import { clearSelectedBill } from '../../../../state/axa/selectedbill/actions';
import { getOne, remove } from '../../../../services/image/images';
import { setPdfUrl, clearPdfUrl } from "../../../../state/axa/pdfUrl/actions";

import { AppHeaderH3 } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";
import { AskAmount } from "../../../basic/askAmount";
import { ShowModalPDF } from '../../../basic/showModalPDF';
import { AskFiledateModal, NewFiledate } from '../../../basic/askFiledate';
import { AddBillModal } from '../AddBillModal';

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { getImageUrl } from "../../../../utils/image";
import { getSumAmounts } from '../../../../utils/axa/bill';


const BillDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false]);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const bill = useSelector((state: RootState) => state.bill);
  const account = useSelector((state: RootState) => state.account);
  const pdfUrl = useSelector((state: RootState) => state.pdfurl);

  interface Amount {
    amount: string;
  };

  const openModalChange = (): void => setModalOpen([true, false, false, false, false]);
  const openModalDelete = (): void => setModalOpen([false, true, false, false, false]);
  const openModalShow = (): void => setModalOpen([false, false, true, false, false]);
  const openModalRefund = (): void => setModalOpen([false, false, false, true, false]);
  const openModalFiledate = (): void => setModalOpen([false, false, false, false, true]);
  enum ModalDialog {
      CHANGE = 0,
      DELETE = 1,
      SHOW = 2,
      REFUND = 3,
      FILEDATE = 4,
  }  
  const closeModal = (): void => {
      setModalOpen([false, false, false, false, false]);
      dispatch(clearPdfUrl());
      setError(undefined);
  };

  const handleClose = () => {
    dispatch(clearPdfUrl());
    dispatch(clearSelectedBill());
  };

  const handleSelection = (index: number) => {
    switch (index) {
      case 0:
      case 1:
        const id = bill.notes[index].dataId;
        const fetchImage = async () => {
          const newImage = await getOne(id);
          dispatch(setPdfUrl(await getImageUrl(newImage)));
        };
        fetchImage();
        openModalShow();
        break;
      case 2:
        dispatch(setPage({ mainpage, subpage: 'accounts' }));
        break;
      case 3:
        openModalRefund();
        break;
      case 4:
        openModalFiledate();
        break;
      }
  };

  const  handleDelete = async () => {
    if (bill.id!=='') {
      dispatch(removeBill(bill.id));
      dispatch(clearSelectedBill());
      bill.notes.forEach(async note => {
        await remove(note.dataId);
      })
    }
    closeModal();
    dispatch(setPage({ mainpage, subpage: 'bills' }));
  };

  const handleChangedRefund = (refund: Amount) => {
    const billToUpdate: Bill = {
      ...bill,
    };
    billToUpdate.details[0].refund = refund.amount;
    dispatch(updateBill(billToUpdate));
    closeModal();
    dispatch(clearSelectedBill());
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
  };

  const handleAddNote = async (newFiledate: NewFiledate) => {
    const billToUpdate: Bill = {
      ...bill,
    };
    const file: File = newFiledate.filedate.file;
    const content: Content = await create2(file);
    const note: Note = {
      ...content,
      received: newFiledate.filedate.date
    };
    billToUpdate.notes.push(note);
    dispatch(updateBill(billToUpdate));
    closeModal();
    dispatch(clearSelectedBill());
    dispatch(setPage({ mainpage, subpage: 'bills' }));
  };


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
      <AppHeaderH3 text={'Rechnung ' + bill.name.name} icon='zoom-in'/>
      <AddBillModal
          edittype={Edittype.EDIT}
          modalOpen={modalOpen[ModalDialog.CHANGE]}
          onSubmit={handleChangedBill} 
          error={error}
          onClose={closeModal}
      />
      <AskModal
          header='Rechnung löschen'
          prompt={'Rechnung ' + bill.name.name}
          modalOpen={modalOpen[ModalDialog.DELETE]}
          onSubmit={handleDelete}
          onClose={closeModal}
      />
      <AskAmount
          header='Erstattung ändern'
          prompt={'Rechnung ' + bill.name.name}
          modalOpen={modalOpen[ModalDialog.REFUND]}
          onSubmit={handleChangedRefund}
          onClose={closeModal}
      />
      <AskFiledateModal
          title={`Neues Dokument zu Rechnung ${bill.name.name} ablegen`}
          modalOpen={modalOpen[ModalDialog.FILEDATE]}
          onSubmit={handleAddNote}
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
            <Table.HeaderCell>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{bill.name.name}</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Rechnungssteller</Table.Cell>
            <Table.Cell>{bill.invoicingparty}</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Betrag</Table.Cell>
            <Table.Cell>{getSumAmounts(bill)}</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Erstattung</Table.Cell>
            <Table.Cell>{bill.details[0].refund}</Table.Cell>
            <Table.Cell><Button color='blue' style={styleMainMenu} onClick={() => handleSelection(3) }>Ändern</Button></Table.Cell>
          </Table.Row>
         {bill.notes.length>0&&<Table.Row onClick={() => handleSelection(0)}>
            <Table.Cell>Rechnung</Table.Cell>
            <Table.Cell>{bill.notes[0].received}</Table.Cell>
            <Table.Cell><Button color='blue' style={styleMainMenu} onClick={() => handleSelection(0) }>Anzeigen</Button></Table.Cell>
          </Table.Row>}
          {bill.notes.length>1&&<Table.Row onClick={() => handleSelection(1)}>
            <Table.Cell>Quittung</Table.Cell>
            <Table.Cell>{bill.notes[1].received}</Table.Cell>
            <Table.Cell><Button color='blue' style={styleMainMenu} onClick={() => handleSelection(1) }>Anzeigen</Button></Table.Cell>
          </Table.Row>}
          {bill.notes.length===0&&<Table.Row>
            <Table.Cell>Rechnung</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell><Button color='blue' style={styleMainMenu} onClick={() => handleSelection(4) }>Anlegen</Button></Table.Cell>
          </Table.Row>}
          {bill.notes.length===1&&<Table.Row>
            <Table.Cell>Quittung</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell><Button color='blue' style={styleMainMenu} onClick={() => handleSelection(4) }>Anlegen</Button></Table.Cell>
          </Table.Row>}
          <Table.Row>
            <Table.Cell>Abrechnung</Table.Cell>
            <Table.Cell>{account.name.name}</Table.Cell>
            <Table.Cell><Button color='blue' style={styleMainMenu} onClick={() => handleSelection(2) }>Anzeigen</Button></Table.Cell>
          </Table.Row>
         </Table.Body>
      </Table>
   </div>
  );
}

export default BillDetailsPage;