import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";

import { RootState } from '../../../../state/store';
import { removeAddressgroup } from '../../../../state/address/addressgrouplist/actions';
import { clearSelectedAddressgroup } from '../../../../state/address/selectedaddressgroup/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AppMenu, Item }  from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";
import { backgroundColor, styleMainMenu } from "../../../../constants";


const AddressgroupDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const addressgroup = useSelector((state: RootState) => state.addressgroup);      

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const handleClose = () => {
    dispatch(clearSelectedAddressgroup());
  }

  const  handleDelete = async () => {
    if (addressgroup.id!=='') {
      dispatch(removeAddressgroup(addressgroup.id));
      dispatch(clearSelectedAddressgroup());
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
      <AppHeaderH3 text='Name'/>
      <AskModal
          header='Adressengruppe löschen'
          prompt={'Adressengruppe ' + addressgroup.groupname.name}
          modalOpen={modalOpen}
          onSubmit={handleDelete}
          onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row >
              <Table.Cell>{addressgroup.groupname.name}</Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default AddressgroupDetailsPage;