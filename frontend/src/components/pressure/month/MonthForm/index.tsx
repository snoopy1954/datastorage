import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Table, Button, Form } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Day, Month } from '../../../../../../backend/src/types/pressure';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from "../../../basic/header";

import { emptyMonth } from '../../../../utils/pressure/month';


interface Props {
  onCancel: () => void;
  onSubmit: (values: Month) => void;
}

export const MonthForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [ changedMonth, setChangedMonth ] = useState(emptyMonth()); 
  const [ currentFocus, setCurrentFocus ] = useState('');

  const month: Month = useSelector((state: RootState) => state.selectedmonth);

  React.useEffect(() => {
    setChangedMonth(month);
  }, [month]);

  if (month.key==="") {
    return (
      <div>
        Bitte warten
      </div>
    );
  }

  const setFocusToField = (fieldname: string) => {
    document.getElementById(fieldname)?.focus();
  };

  const getFieldname = (name: string, index: number): string => {
    const fieldnames = [
    "weight",
    "early.time",
    "early.systolic",
    "early.diastolic",
    "early.pulse",
    "late.time",
    "late.systolic",
    "late.diastolic",
    "late.pulse",
    ];

    let fieldname: string = 'F';
    fieldnames.forEach((item, i) => {
      if (item===name) fieldname += String(i);
    });
    fieldname += String(index);

    return fieldname;
  };

  const nextField = (oldField: string): string => {
    let index1 = +oldField.substr(1,1);
    let index2 = +oldField.substr(2);
    const max2 = changedMonth.days.length;

    if (index1<8) {
      index1 += 1;
    }
    else {
      index1 = 0;
      index2 +=1;
      if (index2===max2) {
        index2 = 0;
      }
    }

    const newField: string = 'F' + String(index1) + String(index2);

    return newField;
  };

  const MatrixField: React.FC<{ placeholder: string, name: string, index: number }> = ({ placeholder, name, index }) => { 
    const fieldname = getFieldname(name, index);

    const onBlur = (event: React.FormEvent<HTMLInputElement>): void => {
      const newMonth: Month = {
        ...changedMonth
      };
      const value = event.currentTarget.value;
      let stringValue: string = '';
      let intValue: number;
      let instruction: string = '';
      switch (name) {
        case "weight":
          stringValue = value.replace(',','');
          intValue = +stringValue;
          if (isNaN(intValue)) stringValue = "";
          if (stringValue.length<2 || stringValue.length>3) stringValue = "";
          if (stringValue.length===2) stringValue += ",0";
          if (stringValue.length===3) stringValue = stringValue.substr(0,2) + "," + stringValue.substr(2);
          break;
        case "early.time":
        case "late.time":
          stringValue = value.replace(':','');
          intValue = +stringValue;
          if (isNaN(intValue)) stringValue = "";
          if (stringValue.length!==4) stringValue = "";
          if (stringValue.length===4) stringValue = stringValue.substr(0,2) + ":" + stringValue.substr(2);
          break;
        case "early.diastolic":
        case "early.systolic":
        case "early.pulse":
        case "late.diastolic":
        case "late.systolic":
        case "late.pulse":
          stringValue = value;
          intValue = +stringValue;
          if (isNaN(intValue)) stringValue = "";
          break;
        default:
      }
      instruction = `newMonth.days[${index}].${name} = '${stringValue}'`;
      // eslint-disable-next-line
      eval(instruction);
      setChangedMonth(newMonth);
      setCurrentFocus(nextField(fieldname));
    };

    return (
      <Form.Field>
        <div>
        <input 
          type='text'
          style={{ height: '20px', width: '60px' }} 
          placeholder={placeholder} 
          onBlur={( event: React.FormEvent<HTMLInputElement> ) => onBlur(event)}
          id={fieldname}
        />
        </div>
      </Form.Field>
    )
  }

  if (currentFocus!=='') setFocusToField(currentFocus);

  return (
    <div className="App">
      <AppHeaderH3 text={changedMonth.monthname + ' ' + changedMonth.year} icon='list'/>
      <Table celled compact small='true' style={{ backgroundColor }}>
         <Table.Header>
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
          {Object.values(changedMonth.days).map((day: Day, index: number) => (
            <Table.Row key={index}>
              <Table.Cell>{day.date}</Table.Cell>
              <Table.Cell><MatrixField placeholder={day.weight} name='weight' index={index}></MatrixField></Table.Cell>
              <Table.Cell><MatrixField placeholder={day.early.time} name='early.time' index={index}></MatrixField></Table.Cell>
              <Table.Cell><MatrixField placeholder={day.early.systolic} name='early.systolic' index={index}></MatrixField></Table.Cell>
              <Table.Cell><MatrixField placeholder={day.early.diastolic} name='early.diastolic' index={index}></MatrixField></Table.Cell>
              <Table.Cell><MatrixField placeholder={day.early.pulse} name='early.pulse' index={index}></MatrixField></Table.Cell>
              <Table.Cell><MatrixField placeholder={day.late.time} name='late.time' index={index}></MatrixField></Table.Cell>
              <Table.Cell><MatrixField placeholder={day.late.systolic} name='late.systolic' index={index}></MatrixField></Table.Cell>
              <Table.Cell><MatrixField placeholder={day.late.diastolic} name='late.diastolic' index={index}></MatrixField></Table.Cell>
              <Table.Cell><MatrixField placeholder={day.late.pulse} name='late.pulse' index={index}></MatrixField></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button style={styleButton} type="button" onClick={() => onSubmit(changedMonth)}>Speichern</Button>
      <Button style={styleButton} type="button" onClick={() => onCancel()}>Abbrechen</Button>
   </div>
  );
}

export default MonthForm;