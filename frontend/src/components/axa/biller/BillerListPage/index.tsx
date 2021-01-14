import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { Biller, BillerNoID } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';
import { addBiller } from  '../../../../state/axa/billerlist/actions';
import { setSelectedBiller } from "../../../../state/axa/selectedbiller/actions";

import { AppHeaderH3 } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AddBillerModal } from '../AddBillerModal';
import { BillerDetailsPage } from '../BillerDetailsPage';


const BillerPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const billers = useSelector((state: RootState) => state.billers);
    const biller = useSelector((state: RootState) => state.biller);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelection = (biller: Biller) => {
      dispatch(setSelectedBiller(biller));
    }  

    const submitBiller = async (values: BillerNoID) => {
      dispatch(addBiller(values));
      closeModal();
    };

    if (biller.id!=="") {
      return (
        <BillerDetailsPage/>
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
          <AppHeaderH3 text='Rechnungssteller' icon='list'/>
          <AddBillerModal
            modalOpen={modalOpen}
            onSubmit={submitBiller}
            error={error}
            onClose={closeModal}
          />
          <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell style={{ backgroundColor }}>Name</Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor }}>Arzt</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(billers).map((biller: Biller) => (
                <Table.Row key={biller.id}  onClick={() => handleSelection(biller)}>
                  <Table.Cell>{biller.name.name}</Table.Cell>
                  <Table.Cell>{biller.person}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default BillerPage;