import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { RootState } from '../../../../state/store';
import { removeDevicetype } from '../../../../state/network/devicetypelist/actions';
import { clearSelectedDevicetype } from '../../../../state/network/selecteddevicetype/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";


const DevicetypeDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const devicetype = useSelector((state: RootState) => state.devicetype);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
      setModalOpen(false);
  };

  const handleClose = () => {
    dispatch(clearSelectedDevicetype());
  }

  const  handleDelete = async () => {
    if (devicetype.id!=='') {
      dispatch(removeDevicetype(devicetype.id));
      dispatch(clearSelectedDevicetype());
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
      <AppHeaderH3Plus text={'Gerätetyp ' + devicetype.name} icon='list'/>
      <AskModal
          header='Gerätetyp löschen'
          prompt={'Gerätetyp ' + devicetype.name}
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
            <Table.Cell>{devicetype.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Beschreibung</Table.Cell>
            <Table.Cell>{devicetype.description}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
   </div>
  );
}

export default DevicetypeDetailsPage;