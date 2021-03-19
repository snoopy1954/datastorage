import React from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Address, Person } from '../../../../../../backend/src/types/address';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
    address: Address;
    onCancel: () => void;
};

export const AddressDetails: React.FC<Props> = ({ address, onCancel }) => {
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
            {person.communication.web!==''&&person.communication.web!==undefined&&
                <>
                <Icon name='globe'/>
                <a href={person.communication.web} target='_blank' rel="noopener noreferrer">{person.communication.web}</a>
                <br></br>
                </>
            }
            {person.comment!==''&&<>{person.comment}</>}
          </div>
        );
    };    

    return (          
        <div className="App">
            <AppHeaderH3 text={address.name.name} icon='zoom-in'/>
            <Table celled style={{ backgroundColor }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{ backgroundColor }}>Parametername</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor }}>Wert</Table.HeaderCell>
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
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default AddressDetails