import React,  { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Input } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';

import { Transaction, TransactionNoID, Accounttype } from '../../../../../../backend/src/types/account';
import { Year, FileContent } from '../../../../../../backend/src/types/basic';
import { Filter } from '../../../../types/account';
import { Edittype } from '../../../../types/basic';

import { getAll } from '../../../../services/account/exchange';
import { getOne } from '../../../../services/filesystem/files';

import { RootState } from '../../../../state/store';
import { addTransaction, updateTransaction, removeTransaction } from '../../../../state/account/transactions/actions';
import { updateAccounttype } from '../../../../state/account/accounttypes/actions';
// import { setSelectedTransaction, clearSelectedTransaction } from '../../../../state/account/transaction/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { TransactionModal } from '../TransactionModal';

import { transactionFilter, transactionTitle } from '../../../../utils/account/transaction';
import { getAmount, getFormatedDate } from '../../../../utils/basic/basic';
import { getAccounttypeFromFilename } from '../../../../utils/account/accounttype';
import { getTransactionsFromCSV, findChecksum, newFilter, emptyTransaction } from '../../../../utils/account/transaction';
import { getCurrentYear } from '../../../../utils/basic/basic';
import { getYear } from '../../../../utils/basic/year';


export const TransactionPage: React.FC = () => {
  const [transaction, setTransaction] = useState<Transaction>(emptyTransaction());
  const [filter, setFilter] = useState<Filter>(newFilter());
  const [modalOpen, setModalOpen] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);

  const dispatch = useDispatch();

  const accounttypes: Accounttype[] = useSelector((state: RootState) => state.accounttypes);      
  const years: Year[] = useSelector((state: RootState) => state.years);      
  const transactions: Transaction[] = useSelector((state: RootState) => state.transactions);
//  const transaction: Transaction = useSelector((state: RootState) => state.transaction);

  // useEffect(() => {
  //   dispatch(clearSelectedTransaction());
  // }, [dispatch]);  

  useEffect(() => {
    if (years.length!==0) {
      const currentYearName: number = +(getCurrentYear());
      const currentYear: Year = getYear(years, String(currentYearName));
      if (currentYear.id!=='') {
        setFilter({
          accountype: 'Diba Giro',
          year: currentYear.name,
          person: ''
        });
      }
    }
  }, [years]);
  
  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = (transaction: Transaction): void => {
    setTransaction(transaction);
    setModalOpen([false, true, false, false]);
  };
      
  const openModalChange = (transaction: Transaction): void => {
    setTransaction(transaction);
    setModalOpen([false, false, true, false]);
  };
      
  const openModalShow = (transaction: Transaction): void => {
    setTransaction(transaction);
    setModalOpen([false, false, false, true]);
  };
  
  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3
  };

  const closeModal = (): void => {
      setModalOpen([false, false, false, false]);
  };

  const actionSelectedAccount = (selection: string) => {
    setFilter({ ...filter, accountype: selection });
  };

  const actionSelectedYear = (selection: string) => {
    setFilter({ ...filter, year: selection });
  };

  const actionNameInput = (name: string) => {
    setFilter({ ...filter, person: name });
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
    setTransaction(emptyTransaction());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeTransaction(transaction.id));
    setTransaction(emptyTransaction());
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
    setTransaction(emptyTransaction());
    closeModal();
  };

  const accounttypeOptions: string[] = [];
  Object.values(accounttypes).forEach(element => {
    accounttypeOptions.push(element.name)
  });

  const accountyearOptions: string[] = [];
  Object.values(years).forEach(element => {
    accountyearOptions.push(element.name)
  });

  const title = 'Buchungen' + transactionTitle(filter);
  const sortedTransactions: Transaction[] = transactionFilter(transactions, filter);
  const filterSelected: boolean = (filter.year===''||filter.accountype==='') ? false : true;

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
        transaction={transaction}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <TransactionModal
        edittype={Edittype.EDIT}
        title={'Buchung ' + transaction.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        transaction={transaction}
        onSubmit={actionChange}
        onClose={closeModal}
      />      
      <TransactionModal
        edittype={Edittype.SHOW}
        title={'Buchung ' + transaction.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        transaction={transaction}
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
      <AppHeaderH3 text={title} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectedAccount(event.currentTarget.value)}>
        <option value="" style={styleButton}>Konto</option>
        {accounttypeOptions.map((option: string, index: number) => (
          option===filter.accountype
          ?<option key={index} selected={true} value={option} style={styleButton}>{option}</option>
          :<option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectedYear(event.currentTarget.value)}>
        <option value="" style={styleButton}>Jahr</option>
        {accountyearOptions.map((option: string, index: number) => (
          option===filter.year
          ?<option key={index} selected={true} value={option} style={styleButton}>{option}</option>
          :<option key={index} value={option} style={styleButton}>{option}</option>
          ))}
      </Button>
      <Input placeholder='Name' onChange={(event: React.FormEvent<HTMLInputElement>) => actionNameInput(event.currentTarget.value)}></Input>
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