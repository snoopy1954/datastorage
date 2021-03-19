import React from "react";
import { Button, Table } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Device, Network, Osversion } from '../../../../../../backend/src/types/network';

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  device: Device;
  onCancel: () => void;
};

export const DeviceDetails: React.FC<Props> = ({ device, onCancel }) => {
  const ShowNetwork: React.FC<{ network: Network; index: number }> = ({ network, index }) => {
    return (
      <div>
        {index>0&&<br></br>}
        Network #{index+1}
        <br></br>MAC: {network.mac}<br></br>Hostname: {network.hostname}<br></br>IP: {network.ip} 
      </div>
    );
  };

  const ShowOs: React.FC<{ osversion: Osversion; index: number }> = ({ osversion, index }) => {
    return (
      <div>
        {index>0&&<br></br>}
        Os #{index+1}
        <br></br>Os: {osversion.name} {osversion.supplement}<br></br>Version: {osversion.version} 
      </div>
    );
  };

  return (
    <div className="App">
      <AppHeaderH3 text={device.name} icon='list'/>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parametername</Table.HeaderCell>
            <Table.HeaderCell>Wert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{device.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Kommentar</Table.Cell>
            <Table.Cell>{device.comment}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Beschreibung</Table.Cell>
            <Table.Cell>{device.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Gerätetyp</Table.Cell>
            <Table.Cell>{device.devicetype}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Netzwerk</Table.Cell>
            <Table.Cell>
              {device.networks.map((network: Network, index: number) => 
                <ShowNetwork key={network.mac} network={network} index={index} />
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Betriebssystem</Table.Cell>
            <Table.Cell>
              {device.osversions.map((osversion: Osversion, index: number) => 
                <ShowOs key={osversion.name} osversion={osversion} index={index} />
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <br></br>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
     </div>
  );
}

export default DeviceDetails;