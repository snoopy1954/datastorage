import React from 'react'
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Table, Button } from "semantic-ui-react";
import { styleButton } from '../../../../constants';

import { Day, Month } from '../../../../../../backend/src/types/pressure';

import { RootState } from '../../../../state/store';

import { AppHeaderH1 } from "../../../basic/header";


interface Props {
  onCancel: () => void;
}

const backgroundColor = 'white';

export const MonthPrint: React.FC<Props> = ({ onCancel }) => {
  const myRef = React.useRef<HTMLDivElement>(null);

  const month: Month = useSelector((state: RootState) => state.selectedmonth);

  const actionPrint = async () => {
    const filename: string = month.year + month.month + '.pdf';
    const input = document.getElementById('divToPrint');
    const HTML_Width: number|undefined = input?.clientWidth;
    const HTML_Height: number|undefined = input?.clientHeight;
    if (!(input instanceof HTMLDivElement)) throw new Error('Scheisse');
    if (HTML_Width===undefined) throw new Error('Scheisse');
    if (HTML_Height===undefined) throw new Error('Scheisse');
    console.log('HTML', HTML_Width, HTML_Height)
    const top_left_margin: number = 15;
    const PDF_Width: number = HTML_Width*1.0 + (top_left_margin*2);
    const PDF_Height: number = (PDF_Width*1.5) + (top_left_margin*2) + 220;
    console.log('PDF ', PDF_Width, PDF_Height)
    const canvas_image_width = HTML_Width;
    const canvas_image_height = HTML_Height;
    const totalPDFPages: number = Math.ceil(HTML_Height/PDF_Height)-1;
    console.log('Seiten', totalPDFPages)
    html2canvas(input, { allowTaint: true })
      .then((canvas) => {
        canvas.getContext('2d');
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPEG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) {
          pdf.addPage([PDF_Width, PDF_Height], 'p');
          pdf.addImage(imgData, 'JPEG', top_left_margin, -(PDF_Height*i)+(top_left_margin), canvas_image_width, canvas_image_height);
        }
        pdf.save(filename);
      })
    ;
    onCancel();
  }

  return (
    <div className="App" ref={myRef} id='divToPrint'>
      <AppHeaderH1 text={month.monthname + ' ' + month.year} icon='list'/>
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
      <br></br><br></br>
      <Button style={styleButton} onClick={actionPrint}>Drucken</Button>
      <Button style={styleButton} onClick={onCancel}>Abbrechen</Button>
   </div>
  );
}

export default MonthPrint;