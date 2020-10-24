import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { RootState } from '../../../../state/store';
import { removeFormat } from '../../../../state/book/formatlist/actions';
import { clearSelectedFormat } from '../../../../state/book/selectedformat/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";


const FormatDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const format = useSelector((state: RootState) => state.format);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
      setModalOpen(false);
  };

  const handleClose = () => {
    dispatch(clearSelectedFormat());
  }

  const  handleDelete = async () => {
    if (format.id!=='') {
      dispatch(removeFormat(format.id));
      dispatch(clearSelectedFormat());
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
      <AppHeaderH3Plus text={'Sprache ' + format.formatname.name} icon='list'/>
      <AskModal
          header='Sprache löschen'
          prompt={'Sprache ' + format.formatname.name}
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
            <Table.Cell>{format.formatname.name}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
   </div>
  );
}

export default FormatDetailsPage;