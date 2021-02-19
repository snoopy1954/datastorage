import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Account, AccountNoID, Bill, Year, Note } from '../../../../../../backend/src/types/axa';
import { AccountWithFileDateNoID, FileDate } from '../../../../types/axa';
import { Content } from '../../../../../../backend/src/types/image';
import { Edittype } from "../../../../types/basic";

import { getOne as getAccount } from '../../../../services/axa/accounts';
import { getOne as getBill} from '../../../../services/axa/bills';

import { RootState } from '../../../../state/store';
import { addAccount, refreshAccount, removeAccount, updateAccount } from  '../../../../state/axa/accountlist/actions';
import { clearSelectedAccount, setSelectedAccount } from '../../../../state/axa/selectedaccount/actions';
import { addSelectedBill, clearSelectedBills } from '../../../../state/axa/selectedbills/actions';
import { setSelectedYear } from '../../../../state/axa/year/actions';

import { create2 } from "../../../../services/image/images";

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { AccountModal } from '../AccountModal';

import { getAmount } from '../../../../utils/basic';


export const AccountPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const accounts: Account[] = useSelector((state: RootState) => state.accounts);
  const account: Account = useSelector((state: RootState) => state.account);
  const years: Year[] = useSelector((state: RootState) => state.axayears);
  const year: Year = useSelector((state: RootState) => state.axayear);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (account: Account): Promise<void> => {
    dispatch(setSelectedAccount(account));
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = async (account: Account): Promise<void> => {
    dispatch(setSelectedAccount(account));
    setModalOpen([false, false, true, false]);
  };

  const openModalShow = async (account: Account): Promise<void> => {
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

  const handleSelection = async (account: Account) => {
    const fetchAccount = async () => {
      const actAccount: Account = await getAccount(account.id);
      dispatch(refreshAccount(actAccount));
      dispatch(clearSelectedBills());
      actAccount.billIDs.forEach(async billID => {
        if(billID!=='') {
          const fetchBill = async () => {
            const newBill: Bill = await getBill(billID);
            dispatch(addSelectedBill(newBill));
          };
          await fetchBill();
        }
      });
      dispatch(setSelectedAccount(actAccount));    
    };
    fetchAccount();
  };

  const actionAdd = async (values: AccountNoID) => {
    const newAccount: AccountNoID = {
      name: values.name,
      status: values.status,
      passed: values.passed,
      notes: values.notes,
      details: values.details,
      billIDs: values.billIDs
    }
    console.log(newAccount)
    dispatch(addAccount(newAccount));
    // offenen Account setzen, vorher Status prüfen
    closeModal();
  };

  const actionSelectionClick = ( selection: string) => {
    Object.values(years).forEach(year => {
      if (selection===year.name.name) {
        dispatch(setSelectedYear(year));
      }
    });
  };

  const actionShow = () => {
    dispatch(clearSelectedAccount());
    closeModal();
  };

  const actionChange = async (values: AccountWithFileDateNoID) => {
    const accountToChange: Account = {
      ...values,
      id: account.id
    };
    const note: FileDate = values.note;
    if (note.file.size > 0) {
      const file: File = note.file;
      const content: Content = await create2(file);
      const newNote: Note = {
        ...content,
        received: note.date
      }
      accountToChange.notes.push(newNote);
    }
    dispatch(updateAccount(accountToChange));
    dispatch(clearSelectedAccount());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeAccount(account.id));
    dispatch(clearSelectedAccount());
    closeModal();
  };  

  const yearOptions: string[] = [];
  Object.values(years).forEach(element => {
    yearOptions.push(element.name.name);
  });

  const accountsToShow: Account[] = Object.values(accounts).filter(item => item.details[0].year.includes(year.name.name));
  const remarkToRest: string = year.id==='' ? '' : ' (Rest Selbstbehalt = ' + year.vital750 + ' €)';

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Status</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Betrag</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Erstattung</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Ablehnung</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Selbstbehalt</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Zahn</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Hilfsmittel</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(accountsToShow).map((account: Account) => (
            <Table.Row key={account.id}  onClick={() => handleSelection(account)}>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='left aligned'>{account.name.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{account.status}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='right aligned'>{getAmount(account.details[0].amount)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='right aligned'>{getAmount(account.details[0].refund)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='right aligned'>{getAmount(account.details[0].deny)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='right aligned'>{getAmount(account.details[0].retension)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='center aligned'>{getAmount(account.details[0].dent20)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='center aligned'>{getAmount(account.details[0].cure10)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(account)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(account)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(account)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
       </Table.Body>        
    );
  };

  return (
    <div className='App'>
      <AccountModal
        edittype={Edittype.ADD}
        title='Neue Abrechnung anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <AccountModal
        edittype={Edittype.SHOW}
        title={`Abrechnung ${account.name.name} anzeigen`}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <AccountModal
        edittype={Edittype.EDIT}
        title={`Abrechnung ${account.name.name} ändern`}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Abrechnung löschen'
        prompt={'Abrechnung ' + account.name.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={'Abrechnungen ' + year.name.name + remarkToRest} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick(event.currentTarget.value)}>
        <option value="" style={styleButton}>Jahr</option>
        {yearOptions.map((option: string, index: number) => (
          option===year.name.name
          ?<option key={index} selected={true} value={option} style={styleButton}>{option}</option>
          :<option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      {accountsToShow.length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {accountsToShow.length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
          </Table>
        </div>
      }
      {accountsToShow.length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
    </div>
  );
};

export default AccountPage;