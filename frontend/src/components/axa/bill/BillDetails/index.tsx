import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { getOne } from '../../../../services/image/images';
import { setPdfUrl, clearPdfUrl } from "../../../../state/axa/pdfUrl/actions";

import { AppHeaderH3 } from "../../../basic/header";
import { ShowModalPDF } from '../../../basic/showModalPDF';

import { getImageUrl } from "../../../../utils/image";
import { getSumAmounts } from '../../../../utils/axa/bill';
import { getFolderFromAxaAccountname } from '../../../../utils/basic';


interface Props {
  onCancel: () => void;
};

export const BillDetails: React.FC<Props> = ({ onCancel }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const bill = useSelector((state: RootState) => state.bill);
  const account = useSelector((state: RootState) => state.account);
  const pdfUrl = useSelector((state: RootState) => state.pdfurl);

  const openModalShow = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    dispatch(clearPdfUrl());
  };

  const handleNoteSelection = (index: number) => {
    switch (index) {
      case 0:
      case 1:
        const id = bill.notes[index].dataId;
        const fetchImage = async () => {
          const newImage = await getOne(id);
          dispatch(setPdfUrl(await getImageUrl(newImage)));
        };
        fetchImage();
        openModalShow();
        break;
      default:
    };
  };

  const handleAccountSelection = () => {
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  };

  const folder: string = account.details[0].year + '/' + getFolderFromAxaAccountname(account.name.name) + '/';

  return (
    <div className="App">
      {pdfUrl!==''&&<ShowModalPDF
          title={bill.notes[0].filename}
          pdfUrl={pdfUrl}
          modalOpen={modalOpen}
          onClose={closeModal}
      />}
      <AppHeaderH3 text={'Rechnung ' + bill.name.name} icon='zoom-in'/>
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
            <Table.Cell>{bill.name.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Rechnungssteller</Table.Cell>
            <Table.Cell>{bill.invoicingparty}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Betrag</Table.Cell>
            <Table.Cell>{getSumAmounts(bill)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Erstattung</Table.Cell>
            <Table.Cell>{bill.details[0].refund}</Table.Cell>
          </Table.Row>
          {bill.notes.length>0&&<Table.Row onClick={() => handleNoteSelection(0)}>
            <Table.Cell>Rechnung</Table.Cell>
            <Table.Cell>{folder}{bill.notes[0].filename} ({bill.notes[0].received})</Table.Cell>
          </Table.Row>}
          {bill.notes.length>1&&<Table.Row onClick={() => handleNoteSelection(1)}>
            <Table.Cell>Quittung</Table.Cell>
            <Table.Cell>{folder}{bill.notes[1].filename} {bill.notes[1].received}</Table.Cell>
          </Table.Row>}
          {bill.notes.length===0&&<Table.Row>
            <Table.Cell>Rechnung</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>}
          {bill.notes.length===1&&<Table.Row>
            <Table.Cell>Quittung</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>}
          <Table.Row onClick={() => handleAccountSelection()}>
            <Table.Cell>Abrechnung</Table.Cell>
            <Table.Cell>{account.name.name}</Table.Cell>
          </Table.Row>
         </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default BillDetails;