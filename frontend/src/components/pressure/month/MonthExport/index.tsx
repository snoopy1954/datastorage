import React from 'react'
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Day, Month } from '../../../../../../backend/src/types/pressure';

import { create } from "../../../../services/pressure/exchange";

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  month: Month;
  onCancel: () => void;
}

export const MonthExport: React.FC<Props> = ({ month, onCancel }) => {
  const actionExport = async () => {
    if (month) {
      await create(month, 'xml');
    }
    onCancel();
  };

  return (
    <div className="App">
      <AppHeaderH3 text={month.monthname + ' ' + month.year} icon='list'/>
      <Table celled compact small='true' style={{ backgroundColor }}>
         <Table.Header>
            <Table.Row>
             <Table.HeaderCell style={{ backgroundColor }} className='three wide left aligned'>Gewicht</Table.HeaderCell>
           </Table.Row>
           <Table.Row>
             <Table.Cell style={{ backgroundColor }} className='three wide center aligned'>Durchschnitt</Table.Cell>
             <Table.Cell style={{ backgroundColor }} className='three wide center aligned'>Anfangswert</Table.Cell>
             <Table.Cell style={{ backgroundColor }} className='three wide center aligned'>Endwert</Table.Cell>
             <Table.Cell style={{ backgroundColor }} className='three wide center aligned'></Table.Cell>
           </Table.Row>
         </Table.Header>
        <Table.Body>
          <Table.Row>
             <Table.HeaderCell style={{ backgroundColor }} className='three wide left aligned'>{month.weight.total}</Table.HeaderCell>
             <Table.HeaderCell style={{ backgroundColor }} className='three wide left aligned'>{month.weight.start}</Table.HeaderCell>
             <Table.HeaderCell style={{ backgroundColor }} className='three wide left aligned'>{month.weight.end}</Table.HeaderCell>
             <Table.HeaderCell style={{ backgroundColor }} className='three wide left aligned'></Table.HeaderCell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table celled compact small='true' style={{ backgroundColor }}>
         <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }} className='three wide left aligned'>Blutdruck (Durchschnittswerte)</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ backgroundColor }} className='three wide center aligned'></Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide center aligned'>Gesamt</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide center aligned'>Früh</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide center aligned'>Spät</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>Systolisch</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>{month.systolic.total}</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>{month.systolic.early}</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>{month.systolic.late}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>Diastolisch</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>{month.diastolic.total}</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>{month.diastolic.early}</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>{month.diastolic.late}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>Puls</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>{month.pulse.total}</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>{month.pulse.early}</Table.Cell>
            <Table.Cell style={{ backgroundColor }} className='three wide left aligned'>{month.pulse.late}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
             <Table.HeaderCell style={{ backgroundColor }} className='three wide left aligned'>Messwerte</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Datum</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Gewicht</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Früh</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Syst</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Diast</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Puls</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Spät</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Syst</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Diast</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Puls</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(month.days).map((day: Day, index: number) => (
            <Table.Row key={index}>
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
      <Button style={styleButton} onClick={actionExport}>Exportieren</Button>
      <Button style={styleButton} onClick={onCancel}>Abbrechen</Button>
   </div>
  );
}

export default MonthExport;