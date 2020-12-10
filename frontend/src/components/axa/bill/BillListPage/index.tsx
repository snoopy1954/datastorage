import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Bill, BillNoID, BillWithFileDatesNoID, Note, FileDate } from '../../../../../../backend/src/types/axa';
import { Content } from '../../../../../../backend/src/types/image';
import { Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { addBill } from  '../../../../state/axa/billlist/actions';
import { setSelectedBill } from "../../../../state/axa/selectedbill/actions";
import { create2 } from "../../../../services/image/images";

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { getCurrentDate } from '../../../../utils/axa';

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

    const handleSelection = (bill: Bill) => {
      dispatch(setSelectedBill(bill));
    };

    const submitBill = async (billdata: BillWithFileDatesNoID) => {
      const newNotes: Note[] = [];
      const filedates: FileDate[] = billdata.filedates;
      const numberOfFiles = filedates.length;
      for (let index = 0; index < numberOfFiles; index++) {
        const file: File = filedates[index].file;
        const content: Content = await create2(file);
        const newNote: Note = {
          ...content,
          received: filedates[index].date
        }
        newNotes.push(newNote);
      }
      delete billdata.filedates;
      const billToSubmit: BillNoID = {
        ...billdata,
        notes: newNotes,
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

    console.log(getCurrentDate());
    
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
          <Table celled>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Abrechnung</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(bills).map((bill: Bill) => (
                <Table.Row key={bill.id}  onClick={() => handleSelection(bill)}>
                  <Table.Cell>{bill.name}</Table.Cell>
                  <Table.Cell>{bill.accountID}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
};

export default BillListPage;