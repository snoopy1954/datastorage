import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Os, OsNoID } from '../../../../../../backend/src/types/network';

import { RootState } from '../../../../state/store';
import { addOs } from  '../../../../state/network/oslist/actions';
import { setSelectedOs } from  '../../../../state/network/selectedos/actions';
import { clearSelectedDevice} from  '../../../../state/network/selecteddevice/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddOsModal from "../AddOsModal";
import OsDetailsPage from "../OsDetailsPage";


const OsListPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const oss = useSelector((state: RootState) => state.oss);
  const os = useSelector((state: RootState) => state.selectedos);

  React.useEffect(() => {
    dispatch(clearSelectedDevice());
  }, [dispatch]);  

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
  };

  const submitNewOs = async (values: OsNoID) => {
    dispatch(addOs(values));
    closeModal();
  };

  const handleSelection = (os: Os) => {
    dispatch(setSelectedOs(os))
  }

  if (os.id!=='') {
    return (
      <OsDetailsPage />
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
      <AppHeaderH3Plus text='Betriebssysteme' icon='list'/>
      <AddOsModal
        modalOpen={modalOpen}
        onSubmit={submitNewOs}
        error={error}
        onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(oss).map((os: Os) => (
            <Table.Row key={os.id} onClick={() => handleSelection(os)}>
              <Table.Cell>{os.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default OsListPage;