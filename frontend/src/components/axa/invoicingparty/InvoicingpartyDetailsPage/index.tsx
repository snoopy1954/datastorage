import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { RootState } from '../../../../state/store';
import { removeInvoicingparty } from '../../../../state/axa/invoicingpartylist/actions';
import { clearSelectedInvoicingparty } from '../../../../state/axa/selectedinvoicingparty/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";


const InvoicingpartyDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const invoicingparty = useSelector((state: RootState) => state.invoicingparty);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
      setModalOpen(false);
  };

  const handleClose = () => {
    dispatch(clearSelectedInvoicingparty());
  }

  const  handleDelete = async () => {
    if (invoicingparty.id!=='') {
      dispatch(removeInvoicingparty(invoicingparty.id));
      dispatch(clearSelectedInvoicingparty());
    }
    closeModal();
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
      name: 'Löschen',
      title: 'Löschen',
      color: 'red',
      onClick: openModal
    },
  ];

  return (
    <div className="App">
      <AppHeaderH3Plus text={'Rechnungssteller ' + invoicingparty.name} icon='list'/>
      <AskModal
          header='Rechnungssteller löschen'
          prompt={'Rechnungssteller ' + invoicingparty.name}
          modalOpen={modalOpen}
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
            <Table.Cell>{invoicingparty.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Person</Table.Cell>
            <Table.Cell>{invoicingparty.person}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
   </div>
  );
}

export default InvoicingpartyDetailsPage;