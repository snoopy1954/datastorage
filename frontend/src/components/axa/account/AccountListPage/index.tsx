import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { Account, AccountNoID, Bill, Year } from '../../../../../../backend/src/types/axa';
import { Edittype } from "../../../../types/basic";

import { getOne as getAccount } from '../../../../services/axa/accounts';
import { getOne as getBill} from '../../../../services/axa/bills';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addAccount, refreshAccount } from  '../../../../state/axa/accountlist/actions';
import { setSelectedAccount } from "../../../../state/axa/selectedaccount/actions";
import { addSelectedBill, clearSelectedBills } from "../../../../state/axa/selectedbills/actions";
import { clearSelectedYear, setSelectedYear } from '../../../../state/axa/year/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AppMenuOpt, ItemOpt } from "../../../basic/menu";

import { getAmount } from '../../../../utils/axa/account';
import AddAccountModal from "../AddAccountModal";
import AccountDetailsPage from '../AccountDetailsPage';


const AccountListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage: string = useSelector((state: RootState) => state.page.mainpage);      
    const accounts: Account[] = useSelector((state: RootState) => state.accounts);
    const account: Account = useSelector((state: RootState) => state.account);
    const years: Year[] = useSelector((state: RootState) => state.axayears);
    const year: Year = useSelector((state: RootState) => state.axayear);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
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

    const submitAccount = async (values: AccountNoID) => {
      const newAccount: AccountNoID = {
        name: values.name,
        status: values.status,
        passed: values.passed,
        notes: values.notes,
        details: values.details,
        billIDs: values.billIDs
      }
      dispatch(addAccount(newAccount));
      // offenen Account setzen, vorher Status prüfen
      closeModal();
    };

    const handleSelectionClick = (_filter: string, selection: string) => {
      Object.values(years).forEach(year => {
        if (selection===year.name.name) {
          dispatch(setSelectedYear(year));
        }
      });
    };

    const handleClose = () => {
      dispatch(clearSelectedYear());
      dispatch(setPage({ mainpage, subpage: 'accounts' }));
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleDummy = () => {
    };   

    const yearOptions: string[] = [];
    Object.values(years).forEach(element => {
      yearOptions.push(element.name.name);
    });

    if (account.id!=="") {
      return (
        <AccountDetailsPage/>
      )
    }  

    const buttons: ItemOpt[] = 
    [
      {
        name: 'Schliessen',
        title: 'Alle',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: handleClose,
        onSelection: handleDummy
      },
      {
        name: 'Jahr',
        title: 'Jahr',
        color: 'blue',
        type: '1',
        options: yearOptions,    
        onClick: handleDummy,
        onSelection: handleSelectionClick
      },
      {
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: openModal,
        onSelection: handleDummy
      },
    ];

    const accountsToShow: Account[] = Object.values(accounts).filter(item => item.details[0].year.includes(year.name.name));
    const remarkToRest: string = year.id==='' ? '' : ' (Rest Selbstbehalt = ' + year.vital750 + ' €)';

    return (
        <div className="App">
          <AppHeaderH3 text={'Abrechnungen ' + year.name.name + remarkToRest} icon='list'/>
          <AddAccountModal
            edittype={Edittype.ADD}
            title='Neu Abrechnung anlegen'
            modalOpen={modalOpen}
            onSubmit={submitAccount}
            error={error}
            onClose={closeModal}
          />
          <AppMenuOpt menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell className='center aligned' style={{ backgroundColor }}>Name</Table.HeaderCell>
              <Table.HeaderCell className='three wide center aligned' style={{ backgroundColor }}>Betrag</Table.HeaderCell>
              <Table.HeaderCell className='three wide center aligned' style={{ backgroundColor }}>Erstattung</Table.HeaderCell>
              <Table.HeaderCell className='three wide center aligned' style={{ backgroundColor }}>Ablehnung</Table.HeaderCell>
              <Table.HeaderCell className='three wide center aligned' style={{ backgroundColor }}>Selbstbehalt</Table.HeaderCell>
              <Table.HeaderCell className='three wide center aligned' style={{ backgroundColor }}>Selbstbehalt (Zahn)</Table.HeaderCell>
              <Table.HeaderCell className='three wide center aligned' style={{ backgroundColor }}>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(accountsToShow).map((account: Account) => (
                <Table.Row key={account.id}  onClick={() => handleSelection(account)}>
                  <Table.Cell>{account.name.name}</Table.Cell>
                  <Table.Cell className='right aligned'>{getAmount(account.details[0].amount)}</Table.Cell>
                  <Table.Cell className='right aligned'>{getAmount(account.details[0].refund)}</Table.Cell>
                  <Table.Cell className='right aligned'>{getAmount(account.details[0].deny)}</Table.Cell>
                  <Table.Cell className='right aligned'>{getAmount(account.details[0].retension)}</Table.Cell>
                  <Table.Cell className='right aligned'>{getAmount(account.details[0].dent20)}</Table.Cell>
                  <Table.Cell>{account.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default AccountListPage;