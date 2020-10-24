import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Day } from "../../../../types/pressure";

import { RootState } from '../../../../state/store';
import { removeMonth } from '../../../../state/pressure/monthlist/actions';
import { clearSelectedMonth } from '../../../../state/pressure/selectedmonth/actions';
import { setSelectedDay } from '../../../../state/pressure/selectedday/actions';

import { create } from "../../../../services/pressure/exchange";

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { getPromptForDeleteMonth } from "../../../../utils/pressure";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import DayDetailsPage from "../../day/DayDetailsPage";


const MonthDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const year = useSelector((state: RootState) => state.selectedyear);
  const month = useSelector((state: RootState) => state.selectedmonth);
  const day = useSelector((state: RootState) => state.selectedday);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const handleSelectedDay = (day: Day) => {
    dispatch(setSelectedDay(day));
  }

  const handleClose = () => {
    dispatch(clearSelectedMonth());
  }

  const  handleDelete = async () => {
    if (month) {
      dispatch(removeMonth(month.id));
    }
    closeModal();
    dispatch(clearSelectedMonth());
  }

  const  handleExport = async () => {
    if (month) {
      await create(month);
    }
    dispatch(clearSelectedMonth());
  }

  if (day.date!=="") {
    return (
      <DayDetailsPage/>
    )
  }

  if (month.key==="" || year.name==="") {
    return (
      <div>
        Heute gibts noch nichts zu sehn, doch morgen bleibt man staunend stehn
      </div>
    );
  }

  const buttons: Item[] = 
  [
    {
      name: 'Schliessen',
      title: 'Schliessen',
      color: 'blue',
      onClick: handleClose
    },
    {
      name: 'Exportieren',
      title: 'Exportieren',
      color: 'blue',
      onClick: handleExport
    },
    {
      name: 'Löschen',
      title: 'Löschen',
      color: 'red',
      onClick: openModal
    },
  ];

  return (
    <div className="App">
      <AppHeaderH3Plus text={month.monthname + ' ' + month.year} icon='list'/>
      <AskModal
          header='Monat löschen'
          prompt={getPromptForDeleteMonth(month)}
          modalOpen={modalOpen}
          onSubmit={handleDelete}
          onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Datum</Table.HeaderCell>
            <Table.HeaderCell>Gewicht</Table.HeaderCell>
            <Table.HeaderCell>Früh</Table.HeaderCell>
            <Table.HeaderCell>Syst</Table.HeaderCell>
            <Table.HeaderCell>Diast</Table.HeaderCell>
            <Table.HeaderCell>Puls</Table.HeaderCell>
            <Table.HeaderCell>Spät</Table.HeaderCell>
            <Table.HeaderCell>Syst</Table.HeaderCell>
            <Table.HeaderCell>Diast</Table.HeaderCell>
            <Table.HeaderCell>Puls</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(month.days).map((day: Day, index: number) => (
            <Table.Row key={index} onClick={() => handleSelectedDay(day)}>
              <Table.Cell>{day.date}</Table.Cell>
              <Table.Cell>{day.weight}</Table.Cell>
              <Table.Cell>{day.early.time}</Table.Cell>
              <Table.Cell>{day.early.systolic}</Table.Cell>
              <Table.Cell>{day.early.diastolic}</Table.Cell>
              <Table.Cell>{day.early.pulse}</Table.Cell>
              <Table.Cell>{day.late.time}</Table.Cell>
              <Table.Cell>{day.late.systolic}</Table.Cell>
              <Table.Cell>{day.late.diastolic}</Table.Cell>
              <Table.Cell>{day.late.pulse}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
   </div>
  );
}

export default MonthDetailsPage;