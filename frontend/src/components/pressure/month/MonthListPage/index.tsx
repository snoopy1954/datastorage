import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { Month, MonthNoID } from '../../../../../../backend/src/types/pressure';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addMonth } from '../../../../state/pressure/monthlist/actions';
import { setSelectedMonth } from '../../../../state/pressure/selectedmonth/actions';
import { setOpenedYear, clearOpenedYear } from '../../../../state/pressure/openedyear/actions';

import { create } from "../../../../services/pressure/months";
import { getAll } from "../../../../services/pressure/exchange";

import { AppHeaderH3 } from "../../../basic/header";
import { AppMenuOpt, ItemOpt } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import MonthDetailsPage from "../MonthDetailsPage";

import { formatData, getNextMonth, getPromptForNextMonth } from "../../../../utils/pressure";


export const MonthListPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const mainpage: string = useSelector((state: RootState) => state.page.mainpage);      
  const year = useSelector((state: RootState) => state.openedyear);
  const years = useSelector((state: RootState) => state.yearlist);
  const months = useSelector((state: RootState) => state.monthlist); 
  const month = useSelector((state: RootState) => state.selectedmonth);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
      setModalOpen(false);
  };

  const createOne = async (migrateOne: MonthNoID) => {
    const newMonth = await create(migrateOne);
    dispatch(addMonth(newMonth));
  };

  const submitNewMonth = async () => {
    if (year) {
      const nextMonth: MonthNoID = getNextMonth(year);
      dispatch(addMonth(nextMonth));
    }
    closeModal();
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

  const handleSelectionClick = (_filter: string, selection: string) => {
    Object.values(years).forEach(year => {
      if (selection===year.name.name) {
        dispatch(setOpenedYear(year));
      }
    });
  };

  const handleClose = () => {
    dispatch(clearOpenedYear());
    dispatch(setPage({ mainpage, subpage: 'months' }));
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleDummy = () => {
  };   

  const yearOptions: string[] = [];
  Object.values(years).forEach(element => {
    yearOptions.push(element.name.name);
  });

  if (month.key!=="") {
    return (
      <MonthDetailsPage/>
    )
  }

  const buttons: ItemOpt[] = 
  [
    {
      name: 'Schliessen',
      title: 'Alle',
      color: 'blue',
      type: '0',
      options: [],    
      onClick: handleClose,
      onSelection: handleDummy
    },
    {
      name: 'Jahr',
      title: 'Jahr',
      color: 'blue',
      type: '1',
      options: yearOptions,    
      onClick: handleDummy,
      onSelection: handleSelectionClick
    },
    {
      name: 'Neu',
      title: 'Neu',
      color: 'blue',
      type: '0',
      options: [],    
      onClick: openModal,
      onSelection: handleDummy
    },
  ];

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
      <AppHeaderH3 text={'Monate des Jahres ' + year.name.name} icon='list'/>
      <AskModal
          header='Neuen Monat anlegen'
          prompt={getPromptForNextMonth(year)}
          modalOpen={modalOpen}
          onSubmit={submitNewMonth}
          onClose={closeModal}
      />
      <AppMenuOpt menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }}>Monat</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }}>Start- / Endgewicht</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }}>Durchschnittsgewicht</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }}>Durchschnitt Syst.</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }}>Durchschnitt Diast.</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }}>Durchschnitt Puls</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {Object.values(months).map((month: Month) => (
            month.year===year.name.name&&
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