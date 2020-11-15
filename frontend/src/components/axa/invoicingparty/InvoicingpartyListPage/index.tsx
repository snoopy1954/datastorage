import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { InvoicingParty, InvoicingPartyNoID } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';
import { addInvoicingparty } from  '../../../../state/axa/invoicingpartylist/actions';
import { setSelectedInvoicingparty } from "../../../../state/axa/selectedinvoicingparty/actions";

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddInvoicingpartyModal from "../AddInvoicingpartyModal";
import InvoicingpartyDetailsPage from '../InvoicingpartyDetailsPage';


const InvoicingpartyListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const invoicingparties = useSelector((state: RootState) => state.invoicingparties);
    const invoicingparty = useSelector((state: RootState) => state.invoicingparty);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelection = (invoicingparty: InvoicingParty) => {
      dispatch(setSelectedInvoicingparty(invoicingparty));
    }  

    const submitInvoicingparty = async (values: InvoicingPartyNoID) => {
      dispatch(addInvoicingparty(values));
      closeModal();
    };

    if (invoicingparty.id!=="") {
      return (
        <InvoicingpartyDetailsPage/>
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
          <AppHeaderH3Plus text='Rechnungssteller' icon='list'/>
          <AddInvoicingpartyModal
            modalOpen={modalOpen}
            onSubmit={submitInvoicingparty}
            error={error}
            onClose={closeModal}
          />
          <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Beschreibung</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(invoicingparties).map((invoicingparty: InvoicingParty) => (
                <Table.Row key={invoicingparty.id}  onClick={() => handleSelection(invoicingparty)}>
                  <Table.Cell>{invoicingparty.name}</Table.Cell>
                  <Table.Cell>{invoicingparty.person}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default InvoicingpartyListPage;