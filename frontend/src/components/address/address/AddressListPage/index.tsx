import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Address, AddressNoID, Addressgroup } from '../../../../../../backend/src/types/addressTypes';
import { Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addAddress } from '../../../../state/address/addresslist/actions';
import { setSelectedAddress } from '../../../../state/address/selectedaddress/actions';
import { setAddressgroupFilter, clearAddressgroupFilter} from '../../../../state/address/addressgroupfilter/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenuOpt, ItemOpt } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { addresslistTitle, addresslistFilter } from "../../../../utils/address";

import AddressDetailsPage from "../AddressDetailsPage";
import AddAddressModal from "../AddAddressModal";


const AddressListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage: string = useSelector((state: RootState) => state.page.mainpage);      
    const addressgroups: Addressgroup[] = useSelector((state: RootState) => state.addressgroups);      
    const addresses: Address[] = useSelector((state: RootState) => state.addresses);
    const address: Address = useSelector((state: RootState) => state.address);
    const addressgroupfilter: string = useSelector((state: RootState) => state.addressgroupfilter);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelection = async (address: Address) => {
        dispatch(setSelectedAddress(address));
    };

    const handleSelectionClick = (_filter: string, selection: string) => {
          dispatch(setAddressgroupFilter(selection));
    };

    const handleNewAddress = async (values: AddressNoID) => {
      console.log(values)
        dispatch(addAddress(values));
        closeModal();
    };

    const handleClose = () => {
      dispatch(clearAddressgroupFilter());
      dispatch(setPage({ mainpage, subpage: 'addresses' }));
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleDummy = () => {
    };

    const addressgroupOptions: string[] = [];
    Object.values(addressgroups).forEach(element => {
      addressgroupOptions.push(element.groupname.name);
    });

    const buttons: ItemOpt[] = [
      {
        name: 'Schliessen',
        title: 'Alle',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: handleClose,
        onSelection: handleDummy
      },
      {
        name: 'Gruppe',
        title: 'Gruppe',
        color: 'blue',
        type: '1',
        options: addressgroupOptions,    
        onClick: handleDummy,
        onSelection: handleSelectionClick
      },
      {
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: openModal,
        onSelection: handleDummy
      },
    ];

    if (address.id!=='') {
      return (
        <AddressDetailsPage/>
      )
    }

    const title = 'Addressenliste' + addresslistTitle(addressgroupfilter);
    const sortedAddresses = addresslistFilter(addresses, addressgroupfilter, addressgroups);

    return (
        <div className="App">
          <AppHeaderH3Plus text={title} icon='list'/>
          <AddAddressModal
            edittype={Edittype.ADD}
            modalOpen={modalOpen}
            onSubmit={handleNewAddress}
            error={error}
            onClose={closeModal}
          />
          <AppMenuOpt menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Gruppe</Table.HeaderCell>
              <Table.HeaderCell>Personen</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(sortedAddresses).map((address: Address) => (
                <Table.Row key={address.id} onClick={() => handleSelection(address)}>
                  <Table.Cell>{address.name.name}</Table.Cell>
                  <Table.Cell>{address.group}</Table.Cell>
                  <Table.Cell>{address.persons.length}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default AddressListPage;