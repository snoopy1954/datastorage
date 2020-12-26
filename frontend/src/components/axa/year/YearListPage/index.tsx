import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Year, YearNoID } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';
import { addYear } from  '../../../../state/axa/years/actions';
import { setSelectedYear } from "../../../../state/axa/year/actions";

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddYearModal from '../AddYearModal';
import { YearDetailsPage } from '../YearDetailsPage';


export const YearPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const years = useSelector((state: RootState) => state.axayears);
    const year = useSelector((state: RootState) => state.axayear);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelection = (year: Year) => {
      dispatch(setSelectedYear(year));
    }  

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
          <AppHeaderH3Plus text='Jahr anlegen' icon='list'/>
          <AddYearModal
            years={years}
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
                <Table.HeaderCell style={{ backgroundColor }}>Vital750 Rest</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor }}>Z100S Rest</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(years).map((year: Year) => (
                <Table.Row key={year.id}  onClick={() => handleSelection(year)}>
                  <Table.Cell>{year.name.name}</Table.Cell>
                  <Table.Cell>{year.vital750}</Table.Cell>
                  <Table.Cell>{year.z100s}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default YearPage;