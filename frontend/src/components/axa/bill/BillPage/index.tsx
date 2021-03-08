import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Bill, BillNoID, Note, Account, Year } from '../../../../../../backend/src/types/axa';
import { BillWithFileDatesNoID, FileDate } from '../../../../types/axa';
import { Content } from '../../../../../../backend/src/types/image';
import { Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { addBill, removeBill, updateBill } from  '../../../../state/axa/billlist/actions';
import { clearSelectedBill, setSelectedBill } from "../../../../state/axa/selectedbill/actions";
import { setSelectedAccount } from "../../../../state/axa/selectedaccount/actions";
import { setSelectedYear } from '../../../../state/axa/year/actions';
import { initializeAccounts } from  '../../../../state/axa/accountlist/actions';

import { create2 } from "../../../../services/image/images";
import { getOne } from '../../../../services/axa/accounts';

import { AppHeaderH3 } from "../../../basic/header";
import { AskModal } from '../../../basic/askModal';
import { BillModal } from "../BillModal";

import { getSumAmounts } from '../../../../utils/axa/bill';
import { getAmount } from '../../../../utils/basic/basic';


export const BillPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const bills = useSelector((state: RootState) => state.bills);
  const bill = useSelector((state: RootState) => state.bill);
  const openaccount = useSelector((state: RootState) => state.openaccount);
  const years: Year[] = useSelector((state: RootState) => state.axayears);
  const year: Year = useSelector((state: RootState) => state.axayear);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (bill: Bill): Promise<void> => {
    dispatch(setSelectedBill(bill));
    const account: Account = await getOne(bill.accountID);
    dispatch(setSelectedAccount(account));
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = async (bill: Bill): Promise<void> => {
    dispatch(setSelectedBill(bill));
    const account: Account = await getOne(bill.accountID);
    dispatch(setSelectedAccount(account));
    setModalOpen([false, false, true, false]);
  };

  const openModalShow = async (bill: Bill): Promise<void> => {
    dispatch(setSelectedBill(bill));
    const account: Account = await getOne(bill.accountID);
    dispatch(setSelectedAccount(account));
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
      const file: File = invoice.file;
      const content: Content = await create2(file);
      const note: Note = {
        ...content,
        received: invoice.date
      }
      notes.push(note);
    }
    if (recipe.file.size > 0) {
      const file: File = recipe.file;
      const content: Content = await create2(file);
      const note: Note = {
        ...content,
        received: recipe.date
      }
      notes.push(note);
    }
    const billToSubmit: BillNoID = {
      ...billdata,
      notes: notes,
      accountID: openaccount.id
    };
    dispatch(addBill(billToSubmit));
    dispatch(initializeAccounts());
    closeModal();
  };

  const actionChange = async (values: BillNoID) => {
    const billToChange: Bill = {
      ...values,
      id: bill.id
    };
    dispatch(updateBill(billToChange));
    dispatch(clearSelectedBill());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeBill(bill.id));
    dispatch(clearSelectedBill());
    closeModal();
  };  

  const actionShow = () => {
    dispatch(clearSelectedBill());
    closeModal();
  };  

  const actionSelectionClick = ( selection: string) => {
    Object.values(years).forEach(year => {
      if (selection===year.name.name) {
        dispatch(setSelectedYear(year));
      }
    });
  };
    
  const yearOptions: string[] = [];
    Object.values(years).forEach(element => {
      yearOptions.push(element.name.name);
  });
    
  const billsToShow: Bill[] = Object.values(bills).filter(item => item.details[0].year.includes(year.name.name));

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
      {openaccount.name.name!==''&&<BillModal
        edittype={Edittype.ADD}
        title='Neue Rechnung anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />}
      <BillModal
        edittype={Edittype.SHOW}
        title={`Rechnung ${bill.name.name} anzeigen`}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <BillModal
        edittype={Edittype.EDIT}
        title={'Rechnung ' + bill.name.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
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
      <AppHeaderH3 text={'Rechnungen ' + year.name.name} icon='list'/>
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