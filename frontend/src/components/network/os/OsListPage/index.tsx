import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, addOs, setSelectedOs, clearSelectedDevice } from "../../../../state";
import { Os, OsNoID } from "../../../../types/network";
import AddOsModal from "../AddOsModal";
import OsDetailsPage from "../OsDetailsPage";
import { create } from "../../../../services/device/oss";
import { AppHeaderH3 } from "../../../basic/header";
import AppMenu from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";
import { Item } from "../../../basic/menu";


const OsListPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{ oss, os }, dispatch] = useStateValue();

  React.useEffect(() => {
    dispatch(clearSelectedDevice());
  }, [dispatch]);  

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
  };

  const submitNewOs = async (values: OsNoID) => {
    const newOs = await create(values);
    dispatch(addOs(newOs));
    closeModal();
  };

  const handleSelection = (os: Os) => {
    dispatch(setSelectedOs(os))
  }

  if (os) {
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
      <AppHeaderH3 text='Betriebssysteme'/>
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
      <AddOsModal
        modalOpen={modalOpen}
        onSubmit={submitNewOs}
        error={error}
        onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
    </div>
  );
}

export default OsListPage;