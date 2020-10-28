import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Version, Os } from '../../../../../../backend/src/types/network';

import { RootState } from '../../../../state/store';
import { updateOs, removeOs } from  '../../../../state/network/oslist/actions';
import { clearSelectedOs } from  '../../../../state/network/selectedos/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddVersionModal from "../AddVersionModal";


const OsDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean]>([false, false]);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const os = useSelector((state: RootState) => state.selectedos);

  const openModalNew = (): void => setModalOpen([true, false]);
  const openModalDelete = (): void => setModalOpen([false, true]);
  enum ModalDialog {
    ADD = 0,
    DELETE = 1
  }

  const closeModal = (): void => {
    setModalOpen([false, false]);
    setError(undefined);
  };

  const submitNewVersion = async (values: Version) => {
      const newOs: Os = os;
      newOs.versions.push(values.version);
      dispatch(updateOs(newOs));
    closeModal();
  };

  const handleClose = () => {
    dispatch(clearSelectedOs());
  }

  const  handleDelete = async () => {
    dispatch(removeOs(os.id));
    dispatch(clearSelectedOs());
  }   

  if (os.id==='') {
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
      onClick: openModalNew
    },
    {
      name: 'Schliessen',
      title: 'Schliessen',
      color: 'blue',
      onClick: handleClose
    },
    {
      name: 'Löschen',
      title: 'Löschen',
      color: 'red',
      onClick: openModalDelete
    },
  ];

  const versions: string[] = Object.values(os.versions);

  return (
    <div className="App">
      <AppHeaderH3Plus text={os.name} icon='list'/>
      <AskModal
        header='Os löschen'
        prompt={'Os löschen ' + os.name}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={handleDelete}
        onClose={closeModal}
      />
      <AddVersionModal
        modalOpen={modalOpen[ModalDialog.ADD]}
        onSubmit={submitNewVersion}
        error={error}
        onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
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
    </div>
  );
}

export default OsDetailsPage;