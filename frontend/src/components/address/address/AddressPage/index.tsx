import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButtonSmall, styleButton } from '../../../../constants';

import { Address, AddressNoID, Addressgroup } from '../../../../../../backend/src/types/address';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addAddress, updateAddress, removeAddress, exchangeAddresses } from '../../../../state/address/addresslist/actions';
import { setSelectedAddress, clearSelectedAddress } from '../../../../state/address/selectedaddress/actions';
import { clearSelectedAddressgroup } from '../../../../state/address/selectedaddressgroup/actions';
import { setAddressgroupFilter, clearAddressgroupFilter} from '../../../../state/address/addressgroupfilter/actions';
import { addChangedAddress, clearChangedAddress } from '../../../../state/address/changedaddresslist/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { AddressModal } from '../AddressModal';

import { addresslistTitle, addresslistFilter } from '../../../../utils/address/address';


export const AddressPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
    const dispatch = useDispatch();

    const addressgroups: Addressgroup[] = useSelector((state: RootState) => state.addressgroups);      
    const addresses: Address[] = useSelector((state: RootState) => state.addresses);
    const address: Address = useSelector((state: RootState) => state.address);
    const addressgroupfilter: string = useSelector((state: RootState) => state.addressgroupfilter);
    const changedAddresses: Address[] = useSelector((state: RootState) => state.changedaddresslist);

    const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
    const openModalDelete = (address: Address): void => {
        dispatch(setSelectedAddress(address));
        setModalOpen([false, true, false, false]);
    };
    
    const openModalChange = (address: Address): void => {
        dispatch(setSelectedAddress(address));
        setModalOpen([false, false, true, false]);
    };
    
    const openModalShow = (address: Address): void => {
        dispatch(setSelectedAddress(address));
        setModalOpen([false, false, false, true]);
    };

    enum ModalDialog {
        NEW = 0,
        DELETE = 1,
        CHANGE = 2,
        SHOW = 3,
    };

    const closeModal = (): void => {
        setModalOpen([false, false, false, false]);
    };

    React.useEffect(() => {
        dispatch(clearSelectedAddress());
        dispatch(clearSelectedAddressgroup());
        dispatch(clearAddressgroupFilter());
    }, [dispatch]);

    const actionSaveSequence = () => {
        Object.values(changedAddresses).forEach(changedAddress => {
            dispatch(updateAddress(changedAddress));
        });
        dispatch(clearChangedAddress());
    };

    const actionSelectionClick = ( selection: string) => {
        dispatch(setAddressgroupFilter(selection));
    };

    const actionAdd = async (values: AddressNoID) => {
        dispatch(addAddress(values));
        closeModal();
    };

    const actionChange = async (values: AddressNoID) => {
        const addressToChange: Address = {
          ...values,
          id: address.id
        };
        dispatch(updateAddress(addressToChange));
        dispatch(clearSelectedAddress());
        closeModal();
    };

    const actionDelete = () => {
        dispatch(removeAddress(address.id));
        dispatch(clearSelectedAddress());
        closeModal();
    };  

    const actionShow = () => {
        dispatch(clearSelectedAddress());
        closeModal();
    };  

    const actionUpDown = (direction: string, index: number, list: Address[]) => {
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

    const addressgroupOptions: string[] = [];
    Object.values(addressgroups).forEach(element => {
        addressgroupOptions.push(element.groupname.name);
    });

    const title = 'Kontakte' + addresslistTitle(addressgroupfilter);
    const sortedAddresses = addresslistFilter(addresses, addressgroupfilter, addressgroups);

    return (
        <div className="App">
            <AddressModal
                edittype={Edittype.ADD}
                title='Neuen Kontakt anlegen'
                modalOpen={modalOpen[ModalDialog.NEW]}
                onSubmit={actionAdd}
                onClose={closeModal}
            />
            <AddressModal
                edittype={Edittype.SHOW}
                title={'Kontakt ' + address.name.name + ' anzeigen'}
                modalOpen={modalOpen[ModalDialog.SHOW]}
                onSubmit={actionShow}
                onClose={closeModal}
            />
            <AddressModal
                edittype={Edittype.EDIT}
                title={'Kontakt ' + address.name.name + ' ändern'}
                modalOpen={modalOpen[ModalDialog.CHANGE]}
                onSubmit={actionChange}
                onClose={closeModal}
            />
            <AskModal
                header='Kontakt löschen'
                prompt={'Kontakt ' + address.name.name + ' löschen?'}
                modalOpen={modalOpen[ModalDialog.DELETE]}
                onSubmit={actionDelete}
                onClose={closeModal}
            />
            <AppHeaderH3 text={title} icon='list'/>
            <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
            <Button as="select" className="ui dropdown" style={styleButton}
                onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick(event.currentTarget.value)}>
                <option value="" style={styleButton}>Gruppe</option>
                {addressgroupOptions.map((option: string, index: number) => (
                    <option key={index} value={option} style={styleButton}>{option}</option>
                ))}
            </Button>
            {Object.values(changedAddresses).length>0&&<Button style={styleButton} onClick={() => actionSaveSequence()}>Speichern</Button>}
            <Table celled style={{ backgroundColor }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Name</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Telefon</Table.HeaderCell>
                        {addressgroupfilter==='Gaststätte'&&
                        <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Kommentar</Table.HeaderCell>}
                        {addressgroupfilter!=='Gaststätte'&&
                        <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Email</Table.HeaderCell>}
                        <Table.HeaderCell style={{ backgroundColor }} className='seven wide center aligned'>Aktion</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Object.values(sortedAddresses).map((address: Address, index: number) => (
                        <Table.Row key={address.id}>
                            <Table.Cell>{address.name.name}</Table.Cell>
                            {address.persons[0].communication.phone!==''&&<Table.Cell>{address.persons[0].communication.phone}</Table.Cell>}
                            {address.persons[0].communication.phone===''&&<Table.Cell>{address.persons[0].communication.mobile}</Table.Cell>}
                            {addressgroupfilter==='Gaststätte'&&<Table.Cell>{address.persons[0].comment}</Table.Cell>}
                            {addressgroupfilter!=='Gaststätte'&&<Table.Cell>{address.persons[0].communication.email}</Table.Cell>}
                            <Table.Cell>
                                <Button style={styleButton} onClick={() => openModalShow(address)}>Anzeigen</Button>
                                <Button style={styleButton} onClick={() => openModalChange(address)}>Ändern</Button>
                                <Button style={styleButton} onClick={() => openModalDelete(address)}>Löschen</Button>
                                <Button className="ui icon button" style={styleButtonSmall} disabled={addressgroupfilter===''}
                                      onClick={() => actionUpDown(Direction.UP, index, sortedAddresses) }>
                                    <i className="angle up icon"></i>
                                </Button>
                                <Button className="ui icon button" style={styleButtonSmall} disabled={addressgroupfilter===''}
                                      onClick={() => actionUpDown(Direction.DOWN, index, sortedAddresses) }>
                                    <i className="angle down icon"></i>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default AddressPage;