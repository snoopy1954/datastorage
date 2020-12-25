import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { RootState } from '../../../../state/store';
import { removeYear } from '../../../../state/axa/years/actions';
import { clearSelectedYear } from '../../../../state/axa/year/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";


export const YearDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const year = useSelector((state: RootState) => state.axayear);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
      setModalOpen(false);
  };

  const handleClose = () => {
    dispatch(clearSelectedYear());
  }

  const  handleDelete = async () => {
    if (year.id!=='') {
      dispatch(removeYear(year.id));
      dispatch(clearSelectedYear());
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
      <AppHeaderH3Plus text={'Rechnungssteller ' + year.name} icon='list'/>
      <AskModal
          header='Rechnungssteller löschen'
          prompt={'Rechnungssteller ' + year.name}
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
            <Table.Cell>{year.name.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Z100S</Table.Cell>
            <Table.Cell>{year.z100s}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>VITAL750</Table.Cell>
            <Table.Cell>{year.vital750}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
   </div>
  );
}

export default YearDetailsPage;