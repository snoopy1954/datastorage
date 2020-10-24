import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";

import { Month, MonthNoID } from "../../../../types/pressure";

import { RootState } from '../../../../state/store';
import { addMonth } from '../../../../state/pressure/monthlist/actions';
import { setSelectedMonth } from '../../../../state/pressure/selectedmonth/actions';

import { create } from "../../../../services/pressure/months";
import { getAll } from "../../../../services/pressure/exchange";

import { AppHeaderH3Plus } from "../../../basic/header";

import { formatData } from "../../../../utils/pressure";
import { backgroundColor } from "../../../../constants";

import MonthDetailsPage from "../MonthDetailsPage";


const MonthListPage: React.FC = () => {
  const dispatch = useDispatch();

  const year = useSelector((state: RootState) => state.selectedyear);
  const months = useSelector((state: RootState) => state.monthlist); 
  const month = useSelector((state: RootState) => state.selectedmonth);

  const createOne = async (migrateOne: MonthNoID) => {
    const newMonth = await create(migrateOne);
    dispatch(addMonth(newMonth));
  };

  const handleSelectedMonth = (month: Month) => {
    dispatch(setSelectedMonth(month));
  }

  const handleMigrate = async () => {
    const migrateData: MonthNoID[] = formatData(await getAll());
    migrateData.forEach(migrateOne => {
      createOne(migrateOne);
    });
  }

  if (month.key!=="") {
    return (
      <MonthDetailsPage/>
    )
  }

  if (!year) {
    return (
      <div>
        Heute gibts noch nichts zu sehn, doch morgen bleibt man staunend stehn
        <br></br>
        <Button color="blue" onClick={() => handleMigrate()}>Migrate</Button>
      </div>
    )
  }

  return (
    <div className="App">
      <AppHeaderH3Plus text={'Jahr: ' + year.name} icon='list'/>
      <Table celled style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Monat</Table.HeaderCell>
            <Table.HeaderCell>Start- / Endgewicht</Table.HeaderCell>
            <Table.HeaderCell>Durchschnittsgewicht</Table.HeaderCell>
            <Table.HeaderCell>Durchschnitt Syst.</Table.HeaderCell>
            <Table.HeaderCell>Durchschnitt Diast.</Table.HeaderCell>
            <Table.HeaderCell>Durchschnitt Puls</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {Object.values(months).map((month: Month) => (
            month.year===year.name&&
            <Table.Row key={month.id} onClick={() => handleSelectedMonth(month)}>
              <Table.Cell>{month.monthname}</Table.Cell>
              <Table.Cell>{month.weight.start} / {month.weight.end}</Table.Cell>
              <Table.Cell>{month.weight.total}</Table.Cell>
              <Table.Cell>{month.systolic.total}</Table.Cell>
              <Table.Cell>{month.diastolic.total}</Table.Cell>
              <Table.Cell>{month.pulse.total}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default MonthListPage;