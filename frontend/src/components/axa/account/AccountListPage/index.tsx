import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Account, AccountNoID, Bill } from '../../../../../../backend/src/types/axa';
import { Edittype } from "../../../../types/basic";

import { getOne as getAccount } from '../../../../services/axa/accounts';
import { getOne as getBill} from '../../../../services/axa/bills';

import { RootState } from '../../../../state/store';
import { addAccount, refreshAccount } from  '../../../../state/axa/accountlist/actions';
import { setSelectedAccount, clearSelectedAccount } from "../../../../state/axa/selectedaccount/actions";
import { addSelectedBill, clearSelectedBills } from "../../../../state/axa/selectedbills/actions";

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { getAmount } from '../../../../utils/axa/account';
import AddAccountModal from "../AddAccountModal";
import AccountDetailsPage from '../AccountDetailsPage';


const AccountListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const accounts: Account[] = useSelector((state: RootState) => state.accounts);
    const account: Account = useSelector((state: RootState) => state.account);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    React.useEffect(() => {
      dispatch(clearSelectedAccount());
    }, [dispatch]);

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
      closeModal();
    };

    if (account.id!=="") {
      return (
        <AccountDetailsPage/>
      )
    }  

    const buttons: Item[] = 
    [
      {
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        onClick: openModal
      },
    ];

    return (
        <div className="App">
          <AppHeaderH3Plus text='Abrechnungen' icon='list'/>
          <AddAccountModal
            edittype={Edittype.ADD}
            title='Neu Abrechnung anlegen'
            modalOpen={modalOpen}
            onSubmit={submitAccount}
            error={error}
            onClose={closeModal}
          />
          <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell style={{ backgroundColor }}>Name</Table.HeaderCell>
              <Table.HeaderCell className='three wide' style={{ backgroundColor }}>Betrag</Table.HeaderCell>
              <Table.HeaderCell className='three wide' style={{ backgroundColor }}>Erstattung</Table.HeaderCell>
              <Table.HeaderCell className='three wide' style={{ backgroundColor }}>Ablehnung</Table.HeaderCell>
              <Table.HeaderCell className='three wide' style={{ backgroundColor }}>Selbstbehalt</Table.HeaderCell>
              <Table.HeaderCell className='three wide' style={{ backgroundColor }}>Selbstbehalt (Zahn)</Table.HeaderCell>
              <Table.HeaderCell className='three wide' style={{ backgroundColor }}>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(accounts).map((account: Account) => (
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