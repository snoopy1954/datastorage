import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";

import { Address, AddressNoID, Addressgroup } from '../../../../../../backend/src/types/address';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addAddress, updateAddress, exchangeAddresses } from '../../../../state/address/addresslist/actions';
import { setSelectedAddress, clearSelectedAddress } from '../../../../state/address/selectedaddress/actions';
import { clearSelectedAddressgroup } from '../../../../state/address/selectedaddressgroup/actions';
import { setAddressgroupFilter, clearAddressgroupFilter} from '../../../../state/address/addressgroupfilter/actions';
import { addChangedAddress, clearChangedAddress } from '../../../../state/address/changedaddresslist/actions';
import { setSortButton, clearSortButton } from '../../../../state/address/sortbutton/actions';

import { AppHeaderH3Plus } from '../../../basic/header';
import { AppMenuOpt, ItemOpt } from '../../../basic/menu';
import { AddressDetailsPage } from '../AddressDetailsPage';
import { AddAddressModal } from '../AddAddressModal';

import { backgroundColor, styleMainMenu } from '../../../../constants';

import { addresslistTitle, addresslistFilter } from '../../../../utils/address';


export const AddressListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage: string = useSelector((state: RootState) => state.page.mainpage);      
    const addressgroups: Addressgroup[] = useSelector((state: RootState) => state.addressgroups);      
    const addresses: Address[] = useSelector((state: RootState) => state.addresses);
    const address: Address = useSelector((state: RootState) => state.address);
    const addressgroupfilter: string = useSelector((state: RootState) => state.addressgroupfilter);
    const changedAddresses: Address[] = useSelector((state: RootState) => state.changedaddresslist);
    const sortbutton: boolean = useSelector((state: RootState) => state.sortbutton);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    React.useEffect(() => {
      dispatch(clearSelectedAddress());
      dispatch(clearSelectedAddressgroup());
      dispatch(clearAddressgroupFilter());
    }, [dispatch]);

    const saveSequence = () => {
      Object.values(changedAddresses).forEach(changedAddress => {
        dispatch(updateAddress(changedAddress));
      });
      dispatch(clearChangedAddress());
      dispatch(clearSortButton());
    }

    const handleSelection = async (address: Address) => {
        dispatch(setSelectedAddress(address));
    };

    const handleSelectionClick = (_filter: string, selection: string) => {
        dispatch(setAddressgroupFilter(selection));
    };

    const handleNewAddress = async (values: AddressNoID) => {
        dispatch(addAddress(values));
        closeModal();
    };

    const handleClose = () => {
        dispatch(clearAddressgroupFilter());
        dispatch(setPage({ mainpage, subpage: 'addresses' }));
    };

    const handleSort = () => {
        dispatch(setSortButton());
    };

    const handleUpDown = (direction: string, index: number, list: Address[]) => {
      if ((direction===Direction.UP && index===0) || (direction===Direction.DOWN && index===list.length-1)) return;

      const address1: Address = list[index]; 
      const address2: Address = direction===Direction.UP ? list[index-1] : list[index+1];
      const seqnr1 = address1.name.seqnr;
      const seqnr2 = address2.name.seqnr;
      address1.name.seqnr = seqnr2;
      address2.name.seqnr = seqnr1;
      const addressesToChange: Address[] = [address1, address2];
      dispatch(exchangeAddresses(addressesToChange));
      dispatch(addChangedAddress(address1));
      dispatch(addChangedAddress(address2));
    };

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

    if (addressgroupfilter) {
      buttons[buttons.length] =     {
        name: 'Sort',
        title: 'Sort',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: handleSort,
        onSelection: handleDummy
      };
    }


    if (Object.values(changedAddresses).length > 0) {
      buttons[buttons.length] = {
        name: 'Speichern',
        title: 'Speichern',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: saveSequence,
        onSelection: handleDummy
      };
    }

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
                <Table.HeaderCell>Telefon</Table.HeaderCell>
                {addressgroupfilter==='Gaststätte'&&<Table.HeaderCell>Kommentar</Table.HeaderCell>}
                {addressgroupfilter!=='Gaststätte'&&<Table.HeaderCell>Email</Table.HeaderCell>}
                {addressgroupfilter!==''&&sortbutton&&<Table.HeaderCell>Reihenfolge</Table.HeaderCell>}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(sortedAddresses).map((address: Address, index: number) => (
                <Table.Row key={address.id}>
                  <Table.Cell onClick={() => handleSelection(address)}>{address.name.name}</Table.Cell>
                  {address.persons[0].communication.phone!==''&&<Table.Cell>{address.persons[0].communication.phone}</Table.Cell>}
                  {address.persons[0].communication.phone===''&&<Table.Cell>{address.persons[0].communication.mobile}</Table.Cell>}
                  {addressgroupfilter==='Gaststätte'&&<Table.Cell>{address.persons[0].comment}</Table.Cell>}
                  {addressgroupfilter!=='Gaststätte'&&<Table.Cell>{address.persons[0].communication.email}</Table.Cell>}
                  {addressgroupfilter!==''&&sortbutton&&<Table.Cell>
                    <Button className="ui icon button" color='green' onClick={() => handleUpDown(Direction.UP, index, sortedAddresses) }>
                      <i className="angle up icon"></i>
                    </Button>
                    <Button className="ui icon button" color='green' onClick={() => handleUpDown(Direction.DOWN, index, sortedAddresses) }>
                      <i className="angle down icon"></i>
                    </Button>
                  </Table.Cell>}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default AddressListPage;