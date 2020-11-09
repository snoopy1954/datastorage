import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Icon } from "semantic-ui-react";

import { Edittype } from "../../../../types/basic";
import { AddressNoID, Address, Person } from '../../../../../../backend/src/types/address';


import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeAddress, updateAddress } from '../../../../state/address/addresslist/actions';
import { clearSelectedAddress } from '../../../../state/address/selectedaddress/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddAddressModal from "../AddAddressModal";
import AskModal from "../../../basic/askModal";


const AddressDetailsPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<[boolean, boolean]>([false, false]);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const address  = useSelector((state: RootState) => state.address);

    const openModalChange = (): void => setModalOpen([true, false]);
    const openModalDelete = (): void => setModalOpen([false, true]);
    enum ModalDialog {
        CHANGE = 0,
        DELETE = 1
    }  
    const closeModal = (): void => {
        setModalOpen([false, false]);
        setError(undefined);
    };

    const handleChangedAddress = async (values: AddressNoID) => {
        if (address) {
            const addressToUpdate: Address = {
                ...values,
                id: address.id
            }
            dispatch(updateAddress(addressToUpdate));
        }
        closeModal();
        dispatch(clearSelectedAddress());
        dispatch(setPage({ mainpage, subpage: 'addresses' }));
    };    

    const handleClose = () => {
        dispatch(clearSelectedAddress());
    };

    const  handleDelete = async () => {
        if (address) {
           dispatch(removeAddress(address.id));
        }
        dispatch(clearSelectedAddress());
        dispatch(setPage({ mainpage, subpage: 'addresses' }));
    };

    const ShowPerson: React.FC<{ person: Person; index: number }> = ({ person, index }) => {
        return (
          <div>
            {index>0&&<br></br>}
            {person.nickname!==''&&<>{person.nickname}<br></br></>}
            {(person.givenname!==''||person.familyname)&&<>Name: {person.givenname} {person.familyname}<br></br></>}
            {person.birthday!==''&&<>Geburtstag: {person.birthday}<br></br></>}
            {person.communication.phone!==''&&<><Icon name='phone'/>{person.communication.phone}<br></br></>} 
            {person.communication.mobile!==''&&<><Icon name='mobile'/>{person.communication.mobile}<br></br></>} 
            {person.communication.email!==''&&<><Icon name='mail'/>{person.communication.email}<br></br></>}
            {person.comment!==''&&<>{person.comment}</>}
          </div>
        );
      };    
        
    if (address===undefined) {
        return (
          <div>
            war wohl nix
          </div>
        );
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
        name: 'Ändern',
        title: 'Ändern',
        color: 'blue',
        onClick: openModalChange
      },
      {
        name: 'Löschen',
        title: 'Löschen',
        color: 'red',
        onClick: openModalDelete
      },
    ];

    return (          
        <div className="App">
            <AppHeaderH3Plus text={address.name.name} icon='zoom-in'/>
            <AddAddressModal
                edittype={Edittype.EDIT}
                modalOpen={modalOpen[ModalDialog.CHANGE]}
                onSubmit={handleChangedAddress} 
                error={error}
                onClose={closeModal}
            />
            <AskModal
                header='Adresse löschen'
                prompt={'Adresse löschen ' + address.name}
                modalOpen={modalOpen[ModalDialog.DELETE]}
                onSubmit={handleDelete}
                onClose={closeModal}
            />
            <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
            <Table celled style={{ backgroundColor }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Parametername</Table.HeaderCell>
                        <Table.HeaderCell>Wert</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Name</Table.Cell>
                        <Table.Cell>{address.name.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Gruppe</Table.Cell>
                        <Table.Cell>{address.group}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Anschrift</Table.Cell>
                        <Table.Cell>{address.completeAddress.street} {address.completeAddress.number}, {address.completeAddress.zipcode} {address.completeAddress.city}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Personen</Table.Cell>
                        <Table.Cell>
                            {address.persons.map((person: Person, index: number) => 
                                <ShowPerson key={index} person={person} index={index} />
                            )}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{address.name.seqnr}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

export default AddressDetailsPage