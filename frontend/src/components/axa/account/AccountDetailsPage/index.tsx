import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";

import { Edittype } from "../../../../types/basic";
import { AccountNoID, Account, Bill } from '../../../../../../backend/src/types/axa';

import { getOne } from '../../../../services/axa/bills';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeAccount, updateAccount } from '../../../../state/axa/accountlist/actions';
import { setSelectedBill } from "../../../../state/axa/selectedbill/actions";
import { clearSelectedAccount } from '../../../../state/axa/selectedaccount/actions';
import { addSelectedBill, clearSelectedBills } from "../../../../state/axa/selectedbills/actions";

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { getSum } from '../../../../utils/basic';
import { getViewname } from '../../../../utils/axa';

import AddAccountModal from "../AddAccountModal";


const AccountDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean]>([false, false, false]);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const account = useSelector((state: RootState) => state.account);
  const selectedbills: Bill[] = useSelector((state: RootState) => state.selectedbills);

  React.useEffect(() => {
    dispatch(clearSelectedBills());
    account.billIDs.forEach(async billID => {
      if(billID!=='') {
        const fetchBill = async () => {
          const newBill: Bill = await getOne(billID);
          dispatch(addSelectedBill(newBill));
        };
        await fetchBill();
      }
    });
  }, [dispatch, account]);

  const openModalChange = (): void => setModalOpen([true, false, false]);
  const openModalDelete = (): void => setModalOpen([false, true, false]);
//  const openModalShow = (): void => setModalOpen([false, false, true]);
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
//    dispatch(updateAccount(accountToUpdate));
    console.log(accountToUpdate)
    closeModal();
    dispatch(clearSelectedAccount());
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  };

  const handleSelection = (bill: Bill) => {
    dispatch(setSelectedBill(bill));
    dispatch(setPage({ mainpage, subpage: 'bills' }));
  };

  const handleStatus = () => {
    console.log('Status ändern');
  };

  const ShowBill: React.FC<{ actbill: Bill }> = ({ actbill }) => {
    if (actbill===undefined) {
      return (
        <div>
        nix
        </div>
      )
    };

    return (
      <div>
        Name: {actbill.name}<br></br>Rechnungsteller: {actbill.invoicingparty}<br></br>Betrag: {actbill.details[0].amount} 
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

  const amounts: string[] = [];
  Object.values(selectedbills).forEach(actBill => {
    amounts.push(actBill.details[0].amount);
  });
  const sum: string = getSum(amounts);

  return (
    <div className="App">
      <AppHeaderH3Plus text={'Abrechnung ' + getViewname(account.name)} icon='zoom-in'/>
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
          prompt={'Abrechnung ' + getViewname(account.name)}
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
            <Table.HeaderCell>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{getViewname(account.name)}</Table.Cell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>{account.status}</Table.Cell>
            <Table.HeaderCell><Button color='blue' style={styleMainMenu} onClick={() => handleStatus()}>Ändern</Button></Table.HeaderCell>
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
            <Table.Cell>Summe</Table.Cell>
            <Table.Cell>{sum}</Table.Cell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>

        </Table.Body>
      </Table>
   </div>
  );
}

export default AccountDetailsPage;