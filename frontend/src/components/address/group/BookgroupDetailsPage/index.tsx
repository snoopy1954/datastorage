import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, clearSelectedBookgroup } from "../../../../state";
import { Subgroup, BookgroupNoID } from "../../../../types/book";
import AddSubgroupModal from "../AddSubgroupModal";
import { update } from "../../../../services/book/bookgroups";
import { AppHeaderH3 } from "../../../basic/header";
import AppMenu from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";
import { Item } from "../../../basic/menu";


const BookgroupDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{ bookgroup }, dispatch] = useStateValue();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const handleNewSubgroup = async (values: Subgroup) => {
    if (bookgroup) {
      const newBookgroup: BookgroupNoID = {
        groupname: bookgroup.groupname,
        subgroups: bookgroup.subgroups
      };
      newBookgroup.subgroups.push(values.subgroup);
      update(bookgroup.id, newBookgroup);
    }
    closeModal();
  };

  const handleClose = () => {
    dispatch(clearSelectedBookgroup());
  }

  if (bookgroup===undefined) {
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

  const subgroups: string[] = Object.values(bookgroup.subgroups);

  return (
    <div className="App">
      <AppHeaderH3 text={bookgroup.groupname.name}/>
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Untergruppen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {subgroups!==[]&&subgroups.map((subgroup: string) => (
            <Table.Row key={subgroup} >
              <Table.Cell>{subgroup}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddSubgroupModal
        modalOpen={modalOpen}
        onSubmit={handleNewSubgroup}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
}

export default BookgroupDetailsPage;