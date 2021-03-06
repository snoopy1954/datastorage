import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Bill, BillNoID, Note, Account, Year } from '../../../../../../backend/src/types/axa';
import { BillWithFileDatesNoID, FileDate, AccountStatus } from '../../../../types/axa';
import { Edittype } from "../../../../types/basic";
import { Content2 } from '../../../../../../backend/src/types/basic';
import { ContentWithFile } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addBill, removeBill, updateBill } from  '../../../../state/axa/bills/actions';
// import { clearSelectedBill, setSelectedBill } from "../../../../state/axa/selectedbill/actions";
import { initializeAccounts } from  '../../../../state/axa/accounts/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AskModal } from '../../../basic/askModal';
import { BillModal } from "../BillModal";

import { getSumAmounts } from '../../../../utils/axa/bill';
import { getAmount } from '../../../../utils/basic/basic';
import { newContent } from '../../../../utils/basic/content';
import { createContent, removeContent } from '../../../../utils/basic/content';
import { emptyBill } from '../../../../utils/axa/bill';
import { emptyYear } from '../../../../utils/axa/year';
import { newNote } from '../../../../utils/axa/axa';
import { emptyAccount } from '../../../../utils/axa/account';


export const BillPage: React.FC = () => {
  const [bill, setBill] = React.useState<Bill>(emptyBill());
  const [year, setYear] = React.useState<Year>(emptyYear());
  const [account, setAccount] = React.useState<Account>(emptyAccount());
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const bills: Bill[] = useSelector((state: RootState) => state.bills);
//  const bill: Bill = useSelector((state: RootState) => state.bill);
  const accounts: Account[] = useSelector((state: RootState) => state.accounts);
  const years: Year[] = useSelector((state: RootState) => state.axayears);

  React.useEffect(() => {
    setAccount(emptyAccount());
    Object.values(accounts).forEach(account => {
      if(account.status===AccountStatus.OPEN) {
        setAccount(account);
      }
    })
  }, [accounts, dispatch]);

  React.useEffect(() => {
    const actYear = String(new Date().getFullYear());
    Object.values(years).forEach(year => {
      if (actYear===year.name) {
        setYear(year);
      }
    })
  }, [dispatch, years]);
  
  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (bill: Bill): Promise<void> => {
    setBill(bill);
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = async (bill: Bill): Promise<void> => {
    setBill(bill);
    setModalOpen([false, false, true, false]);
  };

  const openModalShow = async (bill: Bill): Promise<void> => {
    setBill(bill);
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
  
  const actionAdd = async (billdata: BillWithFileDatesNoID) => {
    const notes: Note[] = [];
    const recipe: FileDate = billdata.recipe;
    const invoice: FileDate = billdata.invoice;
    if (invoice.file.size > 0) {
      const contentwithfile: ContentWithFile = { ...newContent(), file: invoice.file };
      const content: Content2 = await createContent(contentwithfile, 'pdf');
      const note: Note = {
        ...content,
        received: invoice.date
      }
      notes.push(note);
    }
    if (recipe.file.size > 0) {
      const contentwithfile: ContentWithFile = { ...newContent(), file: recipe.file };
      const content: Content2 = await createContent(contentwithfile, 'pdf');
      const note: Note = {
        ...content,
        received: recipe.date
      }
      notes.push(note);
    }
    const billToSubmit: BillNoID = {
      ...billdata,
      notes: notes,
      accountID: account.id
    };
    dispatch(addBill(billToSubmit));
    dispatch(initializeAccounts());
    closeModal();
  };

  const actionChange = async (values: BillWithFileDatesNoID) => {
    const billToChange: Bill = {
      ...values,
      id: bill.id
    };
    const recipe: FileDate = values.recipe;
    const invoice: FileDate = values.invoice;
    let note = newNote();
    if (invoice.file.size > 0) {
      const contentwithfile: ContentWithFile = { ...newContent(), file: invoice.file };
      const content: Content2 = await createContent(contentwithfile, 'pdf');
      note = {
        ...content,
        received: invoice.date
      }
      billToChange.notes.length>0 ? billToChange.notes[0] = note : billToChange.notes.push(note);
    }
    if (recipe.file.size > 0) {
      const contentwithfile: ContentWithFile = { ...newContent(), file: recipe.file };
      const content: Content2 = await createContent(contentwithfile, 'pdf');
      const note: Note = {
        ...content,
        received: recipe.date
      }
      billToChange.notes.length>1 ? billToChange.notes[1] = note : billToChange.notes.push(note);
    }
    dispatch(updateBill(billToChange));
    setBill(emptyBill());
    closeModal();
  };

  const actionDelete = async () => {
    if (bill.notes.length>0) await removeContent(bill.notes[0].dataId, 'pdf');
    if (bill.notes.length>1) await removeContent(bill.notes[1].dataId, 'pdf');
    dispatch(removeBill(bill.id));
    setBill(emptyBill());
    closeModal();
  };  

  const actionShow = () => {
    setBill(emptyBill());
    closeModal();
  };  

  const actionSelectionClick = ( selection: string) => {
    Object.values(years).forEach(year => {
      if (selection===year.name) {
        setYear(year);
      }
    });
  };
    
  const yearOptions: string[] = [];
    Object.values(years).forEach(element => {
      yearOptions.push(element.name);
  });
    
  const billsToShow: Bill[] = Object.values(bills).filter(item => item.details[0].year.includes(year.name));

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '25%' }} className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '25%' }} className='center aligned'>Rechnungssteller</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Betrag</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(billsToShow).map((bill: Bill) => (
            <Table.Row key={bill.id}>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='left aligned' onClick={() => openModalShow(bill)}>{bill.name.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned' onClick={() => openModalShow(bill)}>{bill.invoicingparty}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='right aligned'>{getAmount(getSumAmounts(bill))}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(bill)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(bill)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(bill)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
       </Table.Body>        
    );
  };
  return (
    <div className="App">
      {account.name.name!==''&&<BillModal
        edittype={Edittype.ADD}
        title='Neue Rechnung anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        bill={bill}
        onSubmit={actionAdd}
        onClose={closeModal}
      />}
      <BillModal
        edittype={Edittype.SHOW}
        title={`Rechnung ${bill.name.name} anzeigen`}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        bill={bill}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <BillModal
        edittype={Edittype.EDIT}
        title={'Rechnung ' + bill.name.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        bill={bill}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Rechnung löschen'
        prompt={'Rechnung ' + bill.name.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={'Rechnungen ' + year.name} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick(event.currentTarget.value)}>
        <option value="" style={styleButton}>Jahr</option>
        {yearOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      {billsToShow.length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {billsToShow.length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
          </Table>
        </div>
      }
      {billsToShow.length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
    </div>
  );
};

export default BillPage;