import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';

import { Transaction, TransactionNoID, Accounttype, Accountyear } from '../../../../../../backend/src/types/account';
import { FileContent } from '../../../../../../backend/src/types/basic';
import { Accountfilter } from '../../../../types/account';
import { Edittype } from '../../../../types/basic';

import { getAll } from '../../../../services/account/exchange';
import { getOne } from '../../../../services/filesystem/files';

import { RootState } from '../../../../state/store';
import { setAccountfilter } from '../../../../state/account/accountfilter/actions';
import { addTransaction, updateTransaction, removeTransaction } from '../../../../state/account/transactions/actions';
import { updateAccounttype } from '../../../../state/account/accounttypes/actions';
import { setSelectedTransaction, clearSelectedTransaction } from '../../../../state/account/transaction/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { AskString, Value } from '../../../basic/askString';
import { TransactionModal } from '../TransactionModal';

import { transactionFilter, transactionTitle } from '../../../../utils/account/accountfilter';
import { getAmount, getFormatedDate } from '../../../../utils/basic/basic';
import { getAccounttypeFromFilename } from '../../../../utils/account/accounttype';
import { getTransactionsFromCSV, findChecksum } from '../../../../utils/account/transaction';


export const TransactionPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false]);
  const dispatch = useDispatch();

  const accounttypes: Accounttype[] = useSelector((state: RootState) => state.accounttypes);      
  const accountyears: Accountyear[] = useSelector((state: RootState) => state.accountyears);      
  const accountfilter: Accountfilter = useSelector((state: RootState) => state.accountfilter);
  const transactions: Transaction[] = useSelector((state: RootState) => state.transactions);
  const transaction: Transaction = useSelector((state: RootState) => state.transaction);

  React.useEffect(() => {
    dispatch(clearSelectedTransaction());
  //  dispatch(clearAccountfilter());
  }, [dispatch]);  
  
  const openModalNew = (): void => setModalOpen([true, false, false, false, false]);

  const openModalDelete = (transaction: Transaction): void => {
    dispatch(setSelectedTransaction(transaction));
    setModalOpen([false, true, false, false, false]);
  };
      
  const openModalChange = (transaction: Transaction): void => {
    dispatch(setSelectedTransaction(transaction));
    setModalOpen([false, false, true, false, false]);
  };
      
  const openModalShow = (transaction: Transaction): void => {
    dispatch(setSelectedTransaction(transaction));
    setModalOpen([false, false, false, true, false]);
  };
  
  const openModalPerson = (): void => setModalOpen([false, false, false, false, true]);

  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
    AUTHOR = 4,
  };

  const closeModal = (): void => {
      setModalOpen([false, false, false, false, false]);
  };

  const actionSelectionClick = (filter: string, selection: string) => {
    switch (filter) {
      case 'Konto':
        dispatch(setAccountfilter({
          ...accountfilter, 
          accountype: selection,
        }));
        break;
      case 'Jahr':
        dispatch(setAccountfilter({
          ...accountfilter, 
          accountyear: selection
        }));
        break;
      default:
    }
  };

  const actionSelectedPerson = (selection: Value) => {
    dispatch(setAccountfilter({
      ...accountfilter, 
      person: selection.value
    }));
    closeModal();
  };

  const actionAdd = async (values: TransactionNoID) => {
    dispatch(addTransaction(values));
    closeModal();
  };

  const actionChange = async (values: TransactionNoID) => {
    const transactionToChange: Transaction = {
      ...values,
      id: transaction.id
    };
    dispatch(updateTransaction(transactionToChange));
    dispatch(clearSelectedTransaction());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeTransaction(transaction.id));
    dispatch(clearSelectedTransaction());
    closeModal();
  };

  const actionImportPG = async () => {
    console.log('importier, importier, ...')
    const migrateData: TransactionNoID[] = await getAll();
    migrateData.forEach(migrateOne => {
       if (migrateOne.seqnr > 2500 && migrateOne.seqnr < 3001) dispatch(addTransaction(migrateOne));
    });
    console.log('fertig')
  };

  const formatData = (data: any): FileContent[] => {
    const formatedData: FileContent[] = data;
    return formatedData;
  };

  const actionImportCSV = async () => {
    const directory: string = '2021';
    const fetchList = async () => {
      const list: FileContent[] = formatData(await getOne(directory, 'csv'));
      Object.values(list).forEach(item => {
        const actAccounttype: Accounttype = getAccounttypeFromFilename(accounttypes, item.filename);
        let balance = actAccounttype.balance;
        const newTransactions: TransactionNoID[] = getTransactionsFromCSV(item.content, actAccounttype, transactions);
        newTransactions.forEach(newTransaction => {
          if (!findChecksum(transactions, newTransaction.checksum)) {
            dispatch(addTransaction(newTransaction));
            console.log(newTransaction, 'wird übernommen');
            balance = newTransaction.balance;
          }
          else {
            console.log(newTransaction, 'war schon da');
          }
        });
        actAccounttype.balance = balance;
        dispatch(updateAccounttype(actAccounttype));
      });
    };
    fetchList();
  };

  const actionShow = () => {
    dispatch(clearSelectedTransaction());
    closeModal();
  };

  const accounttypeOptions: string[] = [];
  Object.values(accounttypes).forEach(element => {
    accounttypeOptions.push(element.name)
  });

  const accountyearOptions: string[] = [];
  Object.values(accountyears).forEach(element => {
    accountyearOptions.push(element.name)
  });

  const title = 'Buchungen' + transactionTitle(accountfilter);
  const sortedTransactions: Transaction[] = transactionFilter(transactions, accountfilter);
  const filterSelected: boolean = (accountfilter.accountyear===''||accountfilter.accountype==='') ? false : true;

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '20%' }} className='center aligned'>Buchung</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '20%' }} className='center aligned'>Person</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Datum</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Betrag</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Stand</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(sortedTransactions).map((transaction: Transaction, index: number) => (
            <Table.Row key={transaction.id}>
              <Table.Cell style={{ backgroundColor, width: '20%' } } className='left aligned'>
                {transaction.purpose.length>40 ? transaction.purpose.substr(0,37)+'...' : transaction.purpose}
              </Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '20%' } } className='left aligned'>
                {transaction.person.length>40 ? transaction.person.substr(0,37)+'...' : transaction.person}
              </Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='left aligned'>{getFormatedDate(transaction.date)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='right aligned'>{getAmount(transaction.value)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='right aligned'>{getAmount(transaction.balance)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(transaction)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(transaction)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(transaction)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
  };

  return (
    <div className='App'>
      <TransactionModal
        edittype={Edittype.ADD}
        title='Neue Buchung anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <TransactionModal
        edittype={Edittype.EDIT}
        title={'Buchung ' + transaction.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />      
      <TransactionModal
        edittype={Edittype.SHOW}
        title={'Buchung ' + transaction.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <AskModal
        header='Buchung löschen'
        prompt={'Buchung ' + transaction.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AskString
        header='Person eingeben'
        prompt='Person eingeben'
        modalOpen={modalOpen[ModalDialog.AUTHOR]}
        onSubmit={actionSelectedPerson}
        onClose={closeModal}
      />
      <AppHeaderH3 text={title} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Konto', event.currentTarget.value)}>
        <option value="" style={styleButton}>Konto</option>
        {accounttypeOptions.map((option: string, index: number) => (
          option===accountfilter.accountype
          ?<option key={index} selected={true} value={option} style={styleButton}>{option}</option>
          :<option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Jahr', event.currentTarget.value)}>
        <option value="" style={styleButton}>Jahr</option>
        {accountyearOptions.map((option: string, index: number) => (
          option===accountfilter.accountyear
          ?<option key={index} selected={true} value={option} style={styleButton}>{option}</option>
          :<option key={index} value={option} style={styleButton}>{option}</option>
          ))}
      </Button>
      <Button style={styleButton} onClick={() => openModalPerson()}>Person</Button>
      <Button style={styleButton} onClick={() => actionImportCSV()}>Import</Button>
      <Button style={styleButton} disabled={true} onClick={() => actionImportPG()}>Import PG</Button>
      {!filterSelected&&<AppHeaderH3 text='Konto und Jahr auswählen!' icon='search'/>}
      {sortedTransactions.length>8&&filterSelected&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {sortedTransactions.length>8&&filterSelected&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
          </Table>
        </div>
      }
      {sortedTransactions.length<9&&filterSelected&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default TransactionPage;