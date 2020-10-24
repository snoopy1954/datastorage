import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Day } from "../../../../types/pressure";

import { RootState } from '../../../../state/store';
import { updateMonth } from '../../../../state/pressure/monthlist/actions';
import { clearSelectedDay } from '../../../../state/pressure/selectedday/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { setMonth } from "../../../../utils/pressure";

import EditDayModal from "../EditDayModal";


const DayDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const year = useSelector((state: RootState) => state.selectedyear);
  const month = useSelector((state: RootState) => state.selectedmonth);
  const day = useSelector((state: RootState) => state.selectedday);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitChangedDay = async (values: Day) => {
    const changeMonth = setMonth(month, values);
    dispatch(updateMonth(changeMonth));
    closeModal();
    dispatch(clearSelectedDay());
  };

  const handleClose = () => {
    dispatch(clearSelectedDay());
  }

  if (month.key==="" || year.name==="" || day.date==="") {
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
      name: 'Ändern',
      title: 'Ändern',
      color: 'blue',
      onClick: openModal
    },
  ];

  return (
    <div className="App">
      <AppHeaderH3Plus text={day.date} icon='list'/>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parametername</Table.HeaderCell>
            <Table.HeaderCell>Wert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Gewicht</Table.Cell>
            <Table.Cell>{day.weight}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Uhrzeit</Table.Cell>
            <Table.Cell>{day.early.time}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Diastolisch</Table.Cell>
            <Table.Cell>{day.early.diastolic}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Systolisch</Table.Cell>
            <Table.Cell>{day.early.systolic}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Puls</Table.Cell>
            <Table.Cell>{day.early.pulse}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Uhrzeit</Table.Cell>
            <Table.Cell>{day.late.time}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Diastolisch</Table.Cell>
            <Table.Cell>{day.late.diastolic}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Systolisch</Table.Cell>
            <Table.Cell>{day.late.systolic}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Puls</Table.Cell>
            <Table.Cell>{day.late.pulse}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <EditDayModal
          dayTitle={day.date}
          modalOpen={modalOpen}
          onSubmit={submitChangedDay}
          onClose={closeModal}
          error={error}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
     </div>
  );
}

export default DayDetailsPage;