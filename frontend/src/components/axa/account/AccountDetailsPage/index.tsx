import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Edittype } from "../../../../types/basic";
import { AccountNoID, Account } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeAccount, updateAccount } from '../../../../state/axa/accountlist/actions';
import { clearSelectedAccount } from '../../../../state/axa/selectedaccount/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddAccountModal from "../AddAccountModal";


const AccountDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean]>([false, false, false]);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const account = useSelector((state: RootState) => state.account);

  const openModalChange = (): void => setModalOpen([true, false, false]);
  const openModalDelete = (): void => setModalOpen([false, true, false]);
  const openModalShow = (): void => setModalOpen([false, false, true]);
  enum ModalDialog {
      CHANGE = 0,
      DELETE = 1,
      SHOW = 2
  }  
  const closeModal = (): void => {
      setModalOpen([false, false, false]);
      setError(undefined);
  };

  const handleClose = () => {
    dispatch(clearSelectedAccount());
  }

  const  handleDelete = async () => {
    if (account.id!=='') {
      dispatch(removeAccount(account.id));
      dispatch(clearSelectedAccount());
    }
    closeModal();
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  }

  const handleChangedAccount = async (values: AccountNoID) => {
    const accountToUpdate: Account = {
      id: account.id,
      ...values
    };
    dispatch(updateAccount(accountToUpdate));
    closeModal();
    dispatch(clearSelectedAccount());
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  }

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
      <AppHeaderH3Plus text={'Abrechnung ' + account.name} icon='zoom-in'/>
      <AddAccountModal
          edittype={Edittype.EDIT}
          modalOpen={modalOpen[ModalDialog.CHANGE]}
          onSubmit={handleChangedAccount} 
          error={error}
          onClose={closeModal}
      />
      <AskModal
          header='Abrechnug löschen'
          prompt={'Abrechnung ' + account.name}
          modalOpen={modalOpen[ModalDialog.DELETE]}
          onSubmit={handleDelete}
          onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parametername</Table.HeaderCell>
            <Table.HeaderCell>Wert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{account.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>{account.status}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
   </div>
  );
}

export default AccountDetailsPage;