import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Bill, BillNoID, BillWithFileDatesNoID, Note, FileDate, Account } from '../../../../../../backend/src/types/axa';
import { Content } from '../../../../../../backend/src/types/image';
import { Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { addBill } from  '../../../../state/axa/billlist/actions';
import { setSelectedBill } from "../../../../state/axa/selectedbill/actions";
import { setSelectedAccount } from "../../../../state/axa/selectedaccount/actions";

import { create2 } from "../../../../services/image/images";
import { getOne } from '../../../../services/axa/accounts';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { getSumAmounts } from '../../../../utils/axa/bill';

import AddBillModal from "../AddBillModal";
import BillDetailsPage from '../BillDetailsPage';


const BillListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const bills = useSelector((state: RootState) => state.bills);
    const bill = useSelector((state: RootState) => state.bill);
    const openaccount = useSelector((state: RootState) => state.openaccount);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelection = async (bill: Bill) => {
      dispatch(setSelectedBill(bill));
      const account: Account = await getOne(bill.accountID);
      dispatch(setSelectedAccount(account));
    };

    const submitBill = async (billdata: BillWithFileDatesNoID) => {
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
      closeModal();
    };

    if (bill.id!=="") {
      return (
        <BillDetailsPage/>
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
          <AppHeaderH3Plus text='Rechnungen' icon='list'/>
          <AddBillModal
            edittype={Edittype.ADD}
            modalOpen={modalOpen}
            onSubmit={submitBill}
            error={error}
            onClose={closeModal}
          />
          <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell style={{ backgroundColor }}>Name</Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor }}>Betrag</Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor }}>Rechnungssteller</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(bills).map((bill: Bill) => (
                <Table.Row key={bill.id}  onClick={() => handleSelection(bill)}>
                  <Table.Cell>{bill.name.name}</Table.Cell>
                  <Table.Cell>{getSumAmounts(bill)}</Table.Cell>
                  <Table.Cell>{bill.invoicingparty}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
};

export default BillListPage;