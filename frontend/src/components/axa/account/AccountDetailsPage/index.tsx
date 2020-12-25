import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";

import { Edittype } from "../../../../types/basic";
import { AccountNoID, Account, Bill, Note, Details } from '../../../../../../backend/src/types/axa';
import { AccountStatus } from '../../../../types/axa';
import { Content } from '../../../../../../backend/src/types/image';

import { getOne as getImage } from '../../../../services/image/images';
import { create2 } from "../../../../services/image/images";

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeAccount, updateAccount } from '../../../../state/axa/accountlist/actions';
import { setSelectedBill } from "../../../../state/axa/selectedbill/actions";
import { clearSelectedAccount } from '../../../../state/axa/selectedaccount/actions';
import { setPdfUrl, clearPdfUrl } from "../../../../state/axa/pdfUrl/actions";

import { AppHeaderH3Plus } from '../../../basic/header';
import { AppMenu, Item } from '../../../basic/menu';
import { AskModal } from "../../../basic/askModal";
import { AskDetails } from "../../../basic/askDetails";

import { backgroundColor, styleMainMenu } from '../../../../constants';
import { getImageUrl } from "../../../../utils/image";
import { getSumAmounts } from '../../../../utils/axa/bill';

import { AddAccountModal } from '../AddAccountModal';
import { AskPassedModal, Passed } from '../ChangePassedModal';
import { AskClosedModal, Closed } from '../ChangeClosedModal';
import ShowModalPDF from "../../../basic/showModalPDF";


const AccountDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false, false]);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const account = useSelector((state: RootState) => state.account);
  const selectedbills: Bill[] = useSelector((state: RootState) => state.selectedbills);
  const pdfUrl = useSelector((state: RootState) => state.pdfurl);

  const openModalChange = (): void => setModalOpen([true, false, false, false, false, false]);
  const openModalDelete = (): void => setModalOpen([false, true, false, false, false, false]);
  const openModalShow = (): void => setModalOpen([false, false, true, false, false, false]);
  const openModalPassed = (): void => setModalOpen([true, false, false, true, false, false]);
  const openModalClosed = (): void => setModalOpen([true, false, false, false, true, false]);
  const openModalRefund = (): void => setModalOpen([false, false, false, false, false, true]);

  enum ModalDialog {
      CHANGE = 0,
      DELETE = 1,
      SHOW = 2,
      PASSED = 3,
      CLOSED = 4,
      REFUND = 5,
  };  
  const closeModal = (): void => {
      setModalOpen([false, false, false, false, false, false]);
      setError(undefined);
  };

  const handleClose = () => {
    dispatch(clearSelectedAccount());
    dispatch(clearPdfUrl());
  };

  interface Amount {
    amount: string;
  };

  const handleChangedRefund = (refund: Details) => {
    const accountToUpdate: Account = {
      ...account,
    };
    accountToUpdate.details[0] = refund;
    dispatch(updateAccount(accountToUpdate));
    closeModal();
  };

  const  handleDelete = async () => {
    if (account.id!=='') {
      dispatch(removeAccount(account.id));
      dispatch(clearSelectedAccount());
    }
    closeModal();
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  };

  const handleChangedAccount = async (values: AccountNoID) => {
    const accountToUpdate: Account = {
      id: account.id,
      ...values
    };
    dispatch(updateAccount(accountToUpdate));
    closeModal();
    dispatch(clearSelectedAccount());
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  };

  const handleSelection = (bill: Bill) => {
    dispatch(setSelectedBill(bill));
    dispatch(setPage({ mainpage, subpage: 'bills' }));
  };

  const handleSelectionRefund = () => {
    openModalRefund();
  };  

  const handleNoteSelection = (index: number) => {
    const id = account.notes[index].dataId;
    const fetchImage = async () => {
      const newImage = await getImage(id);
      dispatch(setPdfUrl(getImageUrl(newImage)));
    };
    fetchImage();
    openModalShow();
  };

  const handleStatusPassed = (passed: Passed) => {
    const accountToUpdate: Account = {
      ...account,
    };
    accountToUpdate.status = passed.status;
    accountToUpdate.passed = passed.passed;
    dispatch(updateAccount(accountToUpdate));
    closeModal();
    dispatch(clearSelectedAccount());
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  };

  const handleStatusClosed = async (closed: Closed) => {
    const accountToUpdate: Account = {
      ...account,
    };
    accountToUpdate.status = closed.status;
    const file: File = closed.filedate.file;
    const content: Content = await create2(file);
    const note: Note = {
      ...content,
      received: closed.filedate.date
    };
    accountToUpdate.notes.push(note);
    dispatch(updateAccount(accountToUpdate));
    closeModal();
    dispatch(clearSelectedAccount());
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  };

  const ShowBill: React.FC<{ actbill: Bill }> = ({ actbill }) => {
    return (
      <div>
        Name: {actbill.name.name}<br></br>
        Rechnungsteller: {actbill.invoicingparty}<br></br>
        Betrag: {getSumAmounts(actbill)} 
      </div>
    );
  };

  const ShowDetails: React.FC<{ details: Details }> = ({ details }) => {
    return (
      <div>
        Summe: {details.amount}<br></br>
        Erstattung: {details.refund}<br></br>
        Ablehnung: {details.deny}<br></br>
        Selbstbehalt: {details.retension}<br></br>
        Selbstbehalt (Zahn 20%): {details.dent20}<br></br>
      </div>
    );
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
      <AppHeaderH3Plus text={'Abrechnung ' + account.name.name} icon='zoom-in'/>
      <AddAccountModal
          edittype={Edittype.EDIT}
          title='Abrechnung ändern'
          modalOpen={modalOpen[ModalDialog.CHANGE]}
          onSubmit={handleChangedAccount} 
          error={error}
          onClose={closeModal}
      />
      <AskModal
          header='Abrechnung löschen'
          prompt={'Abrechnung ' + account.name.name}
          modalOpen={modalOpen[ModalDialog.DELETE]}
          onSubmit={handleDelete}
          onClose={closeModal}
      />
      <AskPassedModal
          title={`Status von Abrechnung ${account.name.name} ändern`}
          modalOpen={modalOpen[ModalDialog.PASSED]}
          onSubmit={handleStatusPassed}
          onClose={closeModal}
      />
      <AskDetails
          header='Deails ändern'
          prompt={'Abrechnung ' + account.name.name}
          details={account.details[0]}
          modalOpen={modalOpen[ModalDialog.REFUND]}
          onSubmit={handleChangedRefund}
          onClose={closeModal}
      />
      <AskClosedModal
          title={`Status von Abrechnung ${account.name.name} ändern`}
          modalOpen={modalOpen[ModalDialog.CLOSED]}
          onSubmit={handleStatusClosed}
          onClose={closeModal}
      />
      {pdfUrl!==''&&<ShowModalPDF
          title={account.notes[0].filename}
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
            <Table.Cell>{account.name.name}</Table.Cell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jahr</Table.Cell>
            <Table.Cell>{account.details[0].year}</Table.Cell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>{account.status}</Table.Cell>
            {account.status===AccountStatus.OPEN&&<Table.HeaderCell><Button color='blue' style={styleMainMenu} onClick={() => openModalPassed()}>Ändern</Button></Table.HeaderCell>}
            {account.status===AccountStatus.PASSED&&<Table.HeaderCell><Button color='blue' style={styleMainMenu} onClick={() => openModalClosed()}>Ändern</Button></Table.HeaderCell>}
          </Table.Row>
          <Table.Row>
            <Table.Cell>Antragsdatum</Table.Cell>
            <Table.Cell>{account.passed}</Table.Cell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
            {Object.values(selectedbills).map((bill: Bill, index: number) =>  (
              <Table.Row key={bill.id}>
                <Table.Cell>Rechnung #{index+1}</Table.Cell>
                <Table.Cell><ShowBill actbill={bill}/></Table.Cell>
                <Table.Cell><Button color='blue' style={styleMainMenu} onClick={() => handleSelection(bill)}>Anzeigen</Button></Table.Cell>
              </Table.Row>
            ))}
          <Table.Row>
            <Table.Cell>Details</Table.Cell>
            <Table.Cell><ShowDetails details={account.details[0]}/></Table.Cell>
            <Table.HeaderCell><Button color='blue' style={styleMainMenu} onClick={() => handleSelectionRefund() }>Ändern</Button></Table.HeaderCell>
          </Table.Row>
            {Object.values(account.notes).map((note: Note, index: number) =>  (
              <Table.Row key={note.filename}>
                <Table.Cell>Bescheid #{index+1}</Table.Cell>
                <Table.Cell>{note.received}</Table.Cell>
                <Table.Cell>
                <Button color='blue' style={styleMainMenu} onClick={() => handleNoteSelection(index)}>Anzeigen</Button>
                <Button color='blue' style={styleMainMenu} onClick={() => openModalClosed()}>Neu</Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
   </div>
  );
}

export default AccountDetailsPage;