import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from '../../../../constants';

import { Addressgroup, AddressgroupNoID } from "../../../../../../backend/src/types/address";

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addAddressgroup } from '../../../../state/address/addressgrouplist/actions';
import { setSelectedAddressgroup, clearSelectedAddressgroup } from '../../../../state/address/selectedaddressgroup/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AddressgroupDetailsPage } from '../AddressgroupDetailsPage';
import { AddAddressgroupModal } from '../AddAddressgroupModal';


export const AddressgroupListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage: string = useSelector((state: RootState) => state.page.mainpage);      
    const addressgroups: Addressgroup[] = useSelector((state: RootState) => state.addressgroups);      
    const addressgroup: Addressgroup = useSelector((state: RootState) => state.addressgroup);      

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleNewAddressgroup = async (values: AddressgroupNoID) => {
      console.log(values)
      dispatch(addAddressgroup(values));
      closeModal();
    };

    const handleSelection = (addressgroup: Addressgroup) => {
      dispatch(setSelectedAddressgroup(addressgroup));
    };  

    const handleClose = () => {
      dispatch(clearSelectedAddressgroup());
      dispatch(setPage({ mainpage, subpage: 'addresses' })); 
    }

    if (addressgroup.id!=='') {
      return (
        <AddressgroupDetailsPage/>
      )
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
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        onClick: openModal
      },
    ]; 
    
    return (
        <div className="App">
          <AppHeaderH3Plus text='Adressengruppen' icon='list'/>
          <AddAddressgroupModal
            modalOpen={modalOpen}
            onSubmit={handleNewAddressgroup}
            error={error}
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
              {Object.values(addressgroups).map((addressgroup: Addressgroup) => (
                <Table.Row key={addressgroup.id} onClick={() => handleSelection(addressgroup)}>
                  <Table.Cell>{addressgroup.groupname.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default AddressgroupListPage;