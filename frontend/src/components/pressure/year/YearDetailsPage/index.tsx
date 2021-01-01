import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { Edittype } from "../../../../types/basic";
import { Year, YearNoID } from '../../../../../../backend/src/types/pressure';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeYear, updateYear } from '../../../../state/pressure/yearlist/actions';
import { clearSelectedYear } from '../../../../state/pressure/selectedyear/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";
import { AddYearModal } from '../AddYearModal';


export const YearDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean]>([false, false]);
  const [error, setError] = React.useState<string | undefined>();

  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const year: Year = useSelector((state: RootState) => state.selectedyear);

  const openModalChange = (): void => setModalOpen([true, false]);
  const openModalDelete = (): void => setModalOpen([false, true]);
  enum ModalDialog {
      CHANGE = 0,
      DELETE = 1
  };  
  const closeModal = (): void => {
      setModalOpen([false, false]);
      setError(undefined);
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

  const handleChange = async (values: YearNoID) => {
    if (year) {
        const yearToUpdate: Year = {
            ...values,
            id: year.id
        }
        dispatch(updateYear(yearToUpdate));
    }
    closeModal();
    dispatch(clearSelectedYear());
    dispatch(setPage({ mainpage, subpage: 'addresses' }));
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
      name: 'Ändern',
      title: 'Ändern',
      color: 'blue',
      onClick: openModalChange
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
      <AddYearModal
          edittype={Edittype.EDIT}
          modalOpen={modalOpen[ModalDialog.CHANGE]}
          onSubmit={handleChange}
          error={error}
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
        </Table.Body>
      </Table>
   </div>
  );
}

export default YearDetailsPage;