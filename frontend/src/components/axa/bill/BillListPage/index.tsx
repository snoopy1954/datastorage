import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Bill, BillNoID, Note, Account, Year } from '../../../../../../backend/src/types/axa';
import { BillWithFileDatesNoID, FileDate } from '../../../../types/axa';
import { Content } from '../../../../../../backend/src/types/image';
import { Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addBill } from  '../../../../state/axa/billlist/actions';
import { setSelectedBill } from "../../../../state/axa/selectedbill/actions";
import { setSelectedAccount } from "../../../../state/axa/selectedaccount/actions";
import { clearSelectedYear, setSelectedYear } from '../../../../state/axa/year/actions';
import { initializeAccounts } from  '../../../../state/axa/accountlist/actions';

import { create2 } from "../../../../services/image/images";
import { getOne } from '../../../../services/axa/accounts';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenuOpt, ItemOpt } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { getSumAmounts } from '../../../../utils/axa/bill';

import AddBillModal from "../AddBillModal";
import BillDetailsPage from '../BillDetailsPage';


const BillListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage: string = useSelector((state: RootState) => state.page.mainpage);      
    const bills = useSelector((state: RootState) => state.bills);
    const bill = useSelector((state: RootState) => state.bill);
    const openaccount = useSelector((state: RootState) => state.openaccount);
    const years: Year[] = useSelector((state: RootState) => state.axayears);
    const year: Year = useSelector((state: RootState) => state.axayear);

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

    const handleSelectionClick = (_filter: string, selection: string) => {
      Object.values(years).forEach(year => {
        if (selection===year.name.name) {
          dispatch(setSelectedYear(year));
        }
      });
    };

    const handleClose = () => {
      dispatch(clearSelectedYear());
      dispatch(setPage({ mainpage, subpage: 'bills' }));
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

      // ???
      dispatch(initializeAccounts());

      closeModal();
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleDummy = () => {
    };   
    
    const yearOptions: string[] = [];
      Object.values(years).forEach(element => {
        yearOptions.push(element.name.name);
    });

    if (bill.id!=="") {
      return (
        <BillDetailsPage/>
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

    const billsToShow: Bill[] = Object.values(bills).filter(item => item.details[0].year.includes(year.name.name));

    // console.log('open:', openaccount.name.name)

    return (
        <div className="App">
          <AppHeaderH3Plus text={'Rechnungen ' + year.name.name} icon='list'/>
          {openaccount.name.name!==''&&<AddBillModal
            edittype={Edittype.ADD}
            modalOpen={modalOpen}
            onSubmit={submitBill}
            error={error}
            onClose={closeModal}
          />}
          <AppMenuOpt menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell style={{ backgroundColor }}>Name</Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor }}>Betrag</Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor }}>Rechnungssteller</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(billsToShow).map((bill: Bill) => (
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