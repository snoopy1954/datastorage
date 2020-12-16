import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Account, AccountNoID } from '../../../../../../backend/src/types/axa';
import { Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { addAccount } from  '../../../../state/axa/accountlist/actions';
import { setSelectedAccount } from "../../../../state/axa/selectedaccount/actions";

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { getViewname } from '../../../../utils/axa';

import AddAccountModal from "../AddAccountModal";
import AccountDetailsPage from '../AccountDetailsPage';


const AccountListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const accounts = useSelector((state: RootState) => state.accounts);
    const account = useSelector((state: RootState) => state.account);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelection = async (account: Account) => {
      dispatch(setSelectedAccount(account));
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
      console.log(newAccount)

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
          <Table celled>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(accounts).map((account: Account) => (
                <Table.Row key={account.id}  onClick={() => handleSelection(account)}>
                  <Table.Cell>{getViewname(account.name)}</Table.Cell>
                  <Table.Cell>{account.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default AccountListPage;