import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { Edittype } from "../../../../types/basic";
import { Year, YearNoID } from '../../../../../../backend/src/types/pressure';

import { RootState } from '../../../../state/store';
import { addYear } from  '../../../../state/pressure/yearlist/actions';
import { setSelectedYear } from '../../../../state/pressure/selectedyear/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AddYearModal } from '../AddYearModal';
import { YearDetailsPage } from '../YearDetailsPage';


export const YearListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const years: Year[] = useSelector((state: RootState) => state.yearlist);
    const year: Year = useSelector((state: RootState) => state.selectedyear);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelection = (year: Year) => {
      dispatch(setSelectedYear(year));
    };

    const submitYear = async (values: YearNoID) => {
      dispatch(addYear(values));
      closeModal();
    };

    if (year.id!=="") {
      return (
        <YearDetailsPage/>
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
          <AppHeaderH3 text='Jahr anlegen' icon='list'/>
          <AddYearModal
            edittype={Edittype.ADD}
            modalOpen={modalOpen}
            onSubmit={submitYear}
            error={error}
            onClose={closeModal}
          />
          <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell style={{ backgroundColor }}>Name</Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor }}>Letzter Monat</Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor }}>Letztes Jahr</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(years).map((year: Year) => (
                <Table.Row key={year.id}  onClick={() => handleSelection(year)}>
                  <Table.Cell>{year.name.name}</Table.Cell>
                  <Table.Cell>{year.lastMonth}</Table.Cell>
                  <Table.Cell>{year.isLastYear ? 'ja' : 'nein'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default YearListPage;