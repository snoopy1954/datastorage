import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";

import { Year } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeYear, updateYear } from '../../../../state/axa/years/actions';
import { clearSelectedYear } from '../../../../state/axa/year/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";
import { AskAmount } from "../../../basic/askAmount";

import { backgroundColor, styleMainMenu } from "../../../../constants";


export const YearDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean]>([false, false]);

  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const year: Year = useSelector((state: RootState) => state.axayear);

  const openModalDelete = (): void => setModalOpen([true, false]);
  const openModalRest = (): void => setModalOpen([false, true]);
  enum ModalDialog {
    DELETE = 0,
    REST = 1,
  }  
  const closeModal = (): void => {
      setModalOpen([false, false]);
  };

  interface Amount {
    amount: string;
  };

  const handleClose = () => {
    dispatch(clearSelectedYear());
  };

  const  handleDelete = async () => {
    if (year.id!=='') {
      dispatch(removeYear(year.id));
      dispatch(clearSelectedYear());
    }
    closeModal();
  };

  const handleSelection = () => {
        openModalRest();
  };

  const handleChangedRest = (rest: Amount) => {
    const yearToUpdate: Year = {
      ...year,
    };
    yearToUpdate.vital750 = rest.amount;
    dispatch(updateYear(yearToUpdate));
    closeModal();
    dispatch(clearSelectedYear());
    dispatch(setPage({ mainpage, subpage: 'years' }));
  };

  const buttons: Item[] = 
  [
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

  return (
    <div className="App">
      <AppHeaderH3Plus text={'Jahr ' + year.name.name} icon='list'/>
      <AskModal
          header='Jahr löschen'
          prompt={'Jahr ' + year.name.name}
          modalOpen={modalOpen[ModalDialog.DELETE]}
          onSubmit={handleDelete}
          onClose={closeModal}
      />
      <AskAmount
          header='Rest Selbstbehalt ändern'
          prompt={'Jahr ' + year.name.name}
          modalOpen={modalOpen[ModalDialog.REST]}
          onSubmit={handleChangedRest}
          onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parametername</Table.HeaderCell>
            <Table.HeaderCell>Wert</Table.HeaderCell>
            <Table.HeaderCell>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{year.name.name}</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Z100S</Table.Cell>
            <Table.Cell>{year.z100s}</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>VITAL750</Table.Cell>
            <Table.Cell>{year.vital750}</Table.Cell>
            <Table.Cell><Button color='blue' style={styleMainMenu} onClick={() => handleSelection() }>Ändern</Button></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
   </div>
  );
}

export default YearDetailsPage;