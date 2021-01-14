import React from "react";
import { useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
    onCancel: () => void;
};
  
export const AddressgroupDetails: React.FC<Props> = ({ onCancel }) => {
    const addressgroup = useSelector((state: RootState) => state.addressgroup);      

    return (
        <div className="App">
            <AppHeaderH3 text={addressgroup.groupname.name} icon='zoom-in'/>
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
                        <Table.Cell>{addressgroup.groupname.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Kommentar</Table.Cell>
                        <Table.Cell>{addressgroup.comment}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{addressgroup.groupname.seqnr}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <br></br>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default AddressgroupDetails;