import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, clearSelectedOs } from "../../../../state";
import { Version, OsNoID } from "../../../../types/network";
import AddVersionModal from "../AddVersionModal";
import { update } from "../../../../services/device/oss";
import { AppHeaderH3 } from "../../../basic/header";
import AppMenu from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";
import { Item } from "../../../basic/menu";


const OsDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{ os }, dispatch] = useStateValue();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewVersion = async (values: Version) => {
    if (os) {
      const newOs: OsNoID = {
        name: os.name,
        versions: os.versions
      };
      newOs.versions.push(values.version);
      update(os.id, newOs);
    }
    closeModal();
  };

  const handleClose = () => {
    dispatch(clearSelectedOs());
  }

  if (os===undefined) {
    return (
      <div>
        war wohl nix
      </div>
    );
  }

  const buttons: Item[] = 
  [
    {
      name: 'Neu',
      title: 'Neu',
      color: 'blue',
      onClick: openModal
    },
    {
      name: 'Schliessen',
      title: 'Schliessen',
      color: 'blue',
      onClick: handleClose
    },
  ];

  const versions: string[] = Object.values(os.versions);

  return (
    <div className="App">
      <AppHeaderH3 text={os.name}/>
      <Table celled>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Versionen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {versions!==[]&&versions.map((version: string) => (
            <Table.Row key={version} >
              <Table.Cell>{version}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddVersionModal
        modalOpen={modalOpen}
        onSubmit={submitNewVersion}
        error={error}
        onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
    </div>
  );
}

export default OsDetailsPage;