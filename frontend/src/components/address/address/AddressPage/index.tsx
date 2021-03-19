import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButtonSmall, styleButton } from '../../../../constants';

import { Address, AddressNoID } from '../../../../../../backend/src/types/address';
import { Group } from '../../../../../../backend/src/types/basic';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addAddress, updateAddress, removeAddress, exchangeAddresses } from '../../../../state/address/addresses/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { AddressModal } from '../AddressModal';

import { addresslistTitle, addresslistFilter, emptyAddress } from '../../../../utils/address/address';


export const AddressPage: React.FC = () => {
    const [address, setAddress] = React.useState<Address>(emptyAddress());
    const [group, setGroup] = React.useState('');
    const [addressesChanged, setAddressesChanged] = React.useState<Array<Address>>([]);
    const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);

    const dispatch = useDispatch();

    const addresses: Address[] = useSelector((state: RootState) => state.addresses);
    const groups: Group[] = useSelector((state: RootState) => state.groups);      

    const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
    const openModalDelete = (address: Address): void => {
        setAddress(address);
        setModalOpen([false, true, false, false]);
    };
    
    const openModalChange = (address: Address): void => {
        setAddress(address);
        setModalOpen([false, false, true, false]);
    };
    
    const openModalShow = (address: Address): void => {
        setAddress(address);
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

    const actionSaveSequence = () => {
        Object.values(addressesChanged).forEach(addressChanged => {
            dispatch(updateAddress(addressChanged));
        });
        setAddressesChanged([]);
    };

    const actionSelectionClick = ( selection: string) => {
        setGroup(selection);
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
        setAddress(emptyAddress());
        closeModal();
    };

    const actionDelete = () => {
        dispatch(removeAddress(address.id));
        setAddress(emptyAddress());
        closeModal();
    };  

    const actionShow = () => {
        setAddress(emptyAddress());
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
        setAddressesChanged(arr => [...arr, address1]);
        setAddressesChanged(arr => [...arr, address2]);
    };

    const addressgroupOptions: string[] = [];
    Object.values(groups).forEach(element => {
        addressgroupOptions.push(element.name);
    });

    const title = 'Kontakte' + addresslistTitle(group);
    const sortedAddresses = addresslistFilter(addresses, group, groups);

    const ShowTableHeader: React.FC = () => {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={{ backgroundColor, width: '17%' }} className='center aligned'>Name</Table.HeaderCell>
                    <Table.HeaderCell style={{ backgroundColor, width: '17%' }} className='center aligned'>Telefon</Table.HeaderCell>
                    {group==='Gaststätte'&&
                        <Table.HeaderCell style={{ backgroundColor, width: '17%' }} className='center aligned'>Kommentar</Table.HeaderCell>}
                    {group!=='Gaststätte'&&
                        <Table.HeaderCell style={{ backgroundColor, width: '17%' }} className='center aligned'>Email</Table.HeaderCell>}
                    <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Auf/Ab</Table.HeaderCell>
                    <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        );
    };
    
    const ShowTableBody: React.FC = () => {
        return (
            <Table.Body>
                {Object.values(sortedAddresses).map((address: Address, index: number) => (
                <Table.Row key={address.id}>
                    <Table.Cell style={{ backgroundColor, width: '17%' } } className='left aligned'>{address.name.name}</Table.Cell>
                    {address.persons[0].communication.phone!==''&&
                        <Table.Cell style={{ backgroundColor, width: '17%' } } className='left aligned'>{address.persons[0].communication.phone}</Table.Cell>}
                    {address.persons[0].communication.phone===''&&
                        <Table.Cell style={{ backgroundColor, width: '17%' } } className='left aligned'>{address.persons[0].communication.mobile}</Table.Cell>}
                    {group==='Gaststätte'&&
                        <Table.Cell style={{ backgroundColor, width: '17%' } } className='left aligned'>{address.persons[0].comment}</Table.Cell>}
                    {group!=='Gaststätte'&&
                        <Table.Cell style={{ backgroundColor, width: '17%' } } className='left aligned'>{address.persons[0].communication.email}</Table.Cell>}
                    <Table.Cell style={{ backgroundColor, width: '5%' } } className='center aligned'>
                        <Button className="ui icon button" style={styleButtonSmall} disabled={group===''} 
                            onClick={() => actionUpDown(Direction.UP, index, sortedAddresses) }>
                            <i className="angle up icon"></i>
                        </Button>
                        <Button className="ui icon button" style={styleButtonSmall} disabled={group===''} 
                            onClick={() => actionUpDown(Direction.DOWN, index, sortedAddresses) }>
                            <i className="angle down icon"></i>
                        </Button>
                    </Table.Cell>
                    <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                        <Button style={styleButton} onClick={() => openModalShow(address)}>Anzeigen</Button>
                        <Button style={styleButton} onClick={() => openModalChange(address)}>Ändern</Button>
                        <Button style={styleButton} onClick={() => openModalDelete(address)}>Löschen</Button>
                    </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>        
        );
    };

    return (
        <div className="App">
            <AddressModal
                edittype={Edittype.ADD}
                title='Neuen Kontakt anlegen'
                modalOpen={modalOpen[ModalDialog.NEW]}
                address={address}
                onSubmit={actionAdd}
                onClose={closeModal}
            />
            <AddressModal
                edittype={Edittype.SHOW}
                title={'Kontakt ' + address.name.name + ' anzeigen'}
                modalOpen={modalOpen[ModalDialog.SHOW]}
                address={address}
                onSubmit={actionShow}
                onClose={closeModal}
            />
            <AddressModal
                edittype={Edittype.EDIT}
                title={'Kontakt ' + address.name.name + ' ändern'}
                modalOpen={modalOpen[ModalDialog.CHANGE]}
                address={address}
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
            {Object.values(addressesChanged).length>0&&<Button style={styleButton} onClick={() => actionSaveSequence()}>Speichern</Button>}
            {sortedAddresses.length>8&&
                <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
                    <ShowTableHeader/>
                </Table>
            }
            {sortedAddresses.length>8&&
                <div style={{ overflowY: 'scroll', height: '550px' }}>
                    <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
                        <ShowTableBody/>
                    </Table>
                </div>
            }
            {sortedAddresses.length<9&&
                <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
                    <ShowTableHeader/>
                    <ShowTableBody/>
                </Table>
            }
        </div>
    );
};

export default AddressPage;