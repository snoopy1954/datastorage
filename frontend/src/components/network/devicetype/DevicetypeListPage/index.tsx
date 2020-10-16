import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, addDevicetype, clearSelectedOs, clearSelectedDevice } from "../../../../state";
import { Devicetype } from "../../../../types/network";
import { create } from "../../../../services/device/devicetypes";
import { DevicetypeFormValues } from "../AddDevicetypeModal/AddDevicetypeForm";
import AddDevicetypeModal from "../AddDevicetypeModal";
import { AppHeaderH3 } from "../../../basic/header";
import AppMenu from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";
import { Item } from "../../../basic/menu";


const DevicetypeListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [{ devicetypes }, dispatch] = useStateValue();

    React.useEffect(() => {
      dispatch(clearSelectedDevice());
      dispatch(clearSelectedOs());
    }, [dispatch]);  

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewDevicetype = async (values: DevicetypeFormValues) => {
      const newDevicetype = await create(values);
        dispatch(addDevicetype(newDevicetype));
        closeModal();
    };

    const buttons: Item[] = 
    [
      {
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        onClick: openModal
      },
    ];
      
    return (
        <div className="App">
          <AppHeaderH3 text='Gerätetypen'/>
          <Table celled>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Beschreibung</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(devicetypes).map((devicetype: Devicetype) => (
                <Table.Row key={devicetype.id} >
                  <Table.Cell>{devicetype.name}</Table.Cell>
                  <Table.Cell>{devicetype.description}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <AddDevicetypeModal
            modalOpen={modalOpen}
            onSubmit={submitNewDevicetype}
            error={error}
            onClose={closeModal}
          />
          <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
        </div>
      );
}

export default DevicetypeListPage;