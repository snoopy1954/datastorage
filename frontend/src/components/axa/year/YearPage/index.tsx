import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Year, YearNoID } from '../../../../../../backend/src/types/axa';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addYear, removeYear, updateYear } from  '../../../../state/axa/years/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { YearModal } from '../YearModal';

import { getAmount } from '../../../../utils/basic/basic';
import { emptyYear } from '../../../../utils/axa/year';


export const YearPage: React.FC = () => {
  const [year, setYear] = React.useState<Year>(emptyYear());
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const years: Year[] = useSelector((state: RootState) => state.axayears);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
  const openModalDelete = (year: Year): void => {
    setYear(year);
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (year: Year): void => {
    setYear(year);
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (year: Year): void => {
    setYear(year);
    setModalOpen([false, false, false, true]);
  };

  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
  };

  const closeModal = (): void => {
    setModalOpen([false, false, false, false]);
  };

  const actionAdd = async (values: YearNoID) => {
    console.log(values)
    dispatch(addYear(values));
    closeModal();
  };

  const actionChange = async (values: YearNoID) => {
    const yearToChange: Year = {
      ...values,
      id: year.id
    };
    dispatch(updateYear(yearToChange));
    setYear(emptyYear());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeYear(year.id));
    setYear(emptyYear());
    closeModal();
  };  

  const actionShow = () => {
    setYear(emptyYear());
    closeModal();
  };  

  const ShowTableHeader: React.FC = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{ backgroundColor, width: '35%' }} className='center aligned'>Jahr</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Vital750 Rest</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Z100S Rest</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  };
    
  const ShowTableBody: React.FC = () => {
    return (
      <Table.Body>
        {Object.values(years).map((year: Year) => (
          <Table.Row key={year.id}>
            <Table.Cell style={{ backgroundColor, width: '35%' } } className='left aligned'>{year.name}</Table.Cell>
            <Table.Cell style={{ backgroundColor, width: '10%' } } className='right aligned'>{getAmount(year.vital750)}</Table.Cell>
            <Table.Cell style={{ backgroundColor, width: '10%' } } className='right aligned'>{getAmount(year.z100s)}</Table.Cell>
            <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
              <Button style={styleButton} onClick={() => openModalShow(year)}>Anzeigen</Button>
              <Button style={styleButton} onClick={() => openModalChange(year)}>Ändern</Button>
              <Button style={styleButton} onClick={() => openModalDelete(year)}>Löschen</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>        
    );
  };  
  
  return (
    <div className="App">
      <YearModal
        edittype={Edittype.ADD}
        title='Neues Jahr anlegen'            
        modalOpen={modalOpen[ModalDialog.NEW]}
        year={year}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <YearModal
        edittype={Edittype.SHOW}
        title={'Jahr ' + year.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        year={year}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <YearModal
        edittype={Edittype.EDIT}
        title={'Jahr ' + year.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        year={year}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Jahr löschen'
        prompt={'Jahr ' + year.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Jahre' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      {Object.values(years).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(years).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
          </Table>
        </div>
      }
      {Object.values(years).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
          <ShowTableHeader/>
          <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default YearPage;