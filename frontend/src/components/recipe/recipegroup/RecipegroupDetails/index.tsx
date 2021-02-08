import React from "react";
import { useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { update } from '../../../../services/recipe/groups';

import { Group } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';
import { AskString, Value } from '../../../basic/askString';


interface Props {
  onCancel: () => void;
}

export const RecipegroupDetails: React.FC<Props> = ({ onCancel }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const recipegroup = useSelector((state: RootState) => state.recipegroup);      

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const actionAdd = async (values: Value) => {
    if (recipegroup) {
      const newRecipegroup: Group = recipegroup;
      newRecipegroup.subgroups.push(values.value);
      update(recipegroup.id, newRecipegroup);
    }
    closeModal();
  };

  const subgroups: string[] = Object.values(recipegroup.subgroups);

  return (
    <div className="App">
      <AskString
        header='Neue Rezeptgruppe anlegen'
        prompt='Rezeptgruppe eingeben'
        modalOpen={modalOpen}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <AppHeaderH3 text={recipegroup.name} icon='zoom-in'/>
      <Table celled compact small='true' style={{ backgroundColor }}>
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
      <Button style={styleButton} onClick={openModal}>+U.Gruppe</Button>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
    </div>
  );
}

export default RecipegroupDetails;