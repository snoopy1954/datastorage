import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Account, Bill, Note, Details } from '../../../../../../backend/src/types/axa';
import { Binarydata } from '../../../../../../backend/src/types/basic';

import { getOne as getBill} from '../../../../services/axa/bills';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { ShowModalPDF } from '../../../basic/showModalPDF';

import { getOneBinarydata } from '../../../../utils/basic/content'
import { getImageUrl } from '../../../../utils/basic/binarydata';
import { getSumAmounts } from '../../../../utils/axa/bill';


interface Props {
  account: Account;
  onCancel: () => void;
}

export const AccountDetails: React.FC<Props> = ({ account, onCancel }) => {
  const [url, setUrl] = React.useState('');
  const [bills, setBills] = React.useState<Array<Bill>>([]);
 
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const mainpage: string = useSelector((state: RootState) => state.page.mainpage);      

  React.useEffect(() => {
    setBills([]);
    account.billIDs.forEach(async billID => {
      if(billID!=='') {
        const fetchBill = async () => {
          const newBill: Bill = await getBill(billID);
          setBills(arr => [...arr, newBill]);
        };
        await fetchBill();
      }
    });
  }, [dispatch, account]);  

  const openModalShow = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const handleNoteSelection = (index: number) => {
    const id: string = account.notes[index].dataId;
    const fetchImage = async () => {
        const binarydata: Binarydata = await getOneBinarydata(id, 'pdf');
        setUrl(getImageUrl(binarydata));  
    };
    fetchImage();
    openModalShow();
  };

  const handleBillSelection = (bill: Bill) => {
    dispatch(setPage({ mainpage, subpage: 'bills' }));
  };

  const ShowBill: React.FC<{ actbill: Bill }> = ({ actbill }) => {
    return (
      <div>
        Name: {actbill.name.name}<br></br>
        Rechnungsteller: {actbill.invoicingparty}<br></br>
        Betrag: {getSumAmounts(actbill)} 
      </div>
    );
  };

  const ShowDetails: React.FC<{ details: Details }> = ({ details }) => {
    return (
      <div>
        Summe: {details.amount}<br></br>
        Erstattung: {details.refund}<br></br>
        Ablehnung: {details.deny}<br></br>
        Selbstbehalt: {details.retension}<br></br>
        Selbstbehalt (Zahn 20%): {details.dent20}<br></br>
        Selbstbehalt (Heilmittel 10%): {details.cure10}<br></br>
      </div>
    );
  };

  return (
    <div className="App">
      {url!==''&&<ShowModalPDF
          title={account.notes[0].filename}
          pdfUrl={url}
          modalOpen={modalOpen}
          onClose={closeModal}
      />}
      <AppHeaderH3 text={'Abrechnung ' + account.name.name} icon='zoom-in'/>
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
            <Table.Cell>{account.name.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jahr</Table.Cell>
            <Table.Cell>{account.details[0].year}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>{account.status}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Antragsdatum</Table.Cell>
            <Table.Cell>{account.passed}</Table.Cell>
          </Table.Row>
            {Object.values(bills).map((bill: Bill, index: number) =>  (
              <Table.Row key={bill.id} onClick={() => handleBillSelection(bill)}>
                <Table.Cell>Rechnung #{index+1}</Table.Cell>
                <Table.Cell><ShowBill actbill={bill}/></Table.Cell>
              </Table.Row>
            ))}
          <Table.Row>
            <Table.Cell>Details</Table.Cell>
            <Table.Cell><ShowDetails details={account.details[0]}/></Table.Cell>
          </Table.Row>
            {Object.values(account.notes).map((note: Note, index: number) =>  (
              <Table.Row key={note.filename} onClick={() => handleNoteSelection(index)}>
                <Table.Cell>Bescheid #{index+1}</Table.Cell>
                <Table.Cell>{note.received}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default AccountDetails;