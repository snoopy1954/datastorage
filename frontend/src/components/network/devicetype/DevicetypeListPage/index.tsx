import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Devicetype, DevicetypeNoID } from '../../../../../../backend/src/types/network';

import { RootState } from '../../../../state/store';
import { addDevicetype } from  '../../../../state/network/devicetypelist/actions';
import { setSelectedDevicetype } from "../../../../state/network/selecteddevicetype/actions";
import { clearSelectedOs } from  '../../../../state/network/selectedos/actions';
import { clearSelectedDevice} from  '../../../../state/network/selecteddevice/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddDevicetypeModal from "../AddDevicetypeModal";
import DevicetypeDetailsPage from '../DevicetypeDetailsPage';


const DevicetypeListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const devicetypes = useSelector((state: RootState) => state.devicetypes);
    const devicetype = useSelector((state: RootState) => state.devicetype);

    React.useEffect(() => {
      dispatch(clearSelectedDevice());
      dispatch(clearSelectedOs());
    }, [dispatch]);  

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelectedDevicetype = (devicetype: Devicetype) => {
      dispatch(setSelectedDevicetype(devicetype));
    }  

    const submitNewDevicetype = async (values: DevicetypeNoID) => {
      dispatch(addDevicetype(values));
      closeModal();
    };

    if (devicetype.id!=="") {
      return (
        <DevicetypeDetailsPage/>
      )
    }  

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
          <AppHeaderH3Plus text='Gerätetypen' icon='list'/>
          <AddDevicetypeModal
            modalOpen={modalOpen}
            onSubmit={submitNewDevicetype}
            error={error}
            onClose={closeModal}
          />
          <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Beschreibung</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(devicetypes).map((devicetype: Devicetype) => (
                <Table.Row key={devicetype.id}  onClick={() => handleSelectedDevicetype(devicetype)}>
                  <Table.Cell>{devicetype.name}</Table.Cell>
                  <Table.Cell>{devicetype.description}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default DevicetypeListPage;