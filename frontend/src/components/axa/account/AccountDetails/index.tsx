import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Bill, Note, Details } from '../../../../../../backend/src/types/axa';

import { getOne as getImage } from '../../../../services/image/images';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { setSelectedBill } from '../../../../state/axa/selectedbill/actions';
import { setPdfUrl, clearPdfUrl } from '../../../../state/axa/pdfUrl/actions';

import { AppHeaderH3 } from '../../../basic/header';

import { getImageUrl } from '../../../../utils/binarydata/image';
import { getSumAmounts } from '../../../../utils/axa/bill';

import { ShowModalPDF } from '../../../basic/showModalPDF';


interface Props {
  onCancel: () => void;
}

export const AccountDetails: React.FC<Props> = ({ onCancel }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const account = useSelector((state: RootState) => state.account);
  const selectedbills: Bill[] = useSelector((state: RootState) => state.selectedbills);
  const pdfUrl = useSelector((state: RootState) => state.pdfurl);

  const openModalShow = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    dispatch(clearPdfUrl());
  };

  const handleNoteSelection = (index: number) => {
    const id = account.notes[index].dataId;
    const fetchImage = async () => {
      const newImage = await getImage(id);
      dispatch(setPdfUrl(getImageUrl(newImage)));
    };
    fetchImage();
    openModalShow();
  };

  const handleBillSelection = (bill: Bill) => {
    dispatch(setSelectedBill(bill));
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
      {pdfUrl!==''&&<ShowModalPDF
          title={account.notes[0].filename}
          pdfUrl={pdfUrl}
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
            {Object.values(selectedbills).map((bill: Bill, index: number) =>  (
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