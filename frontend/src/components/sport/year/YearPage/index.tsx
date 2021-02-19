import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Year, YearNoID } from '../../../../../../backend/src/types/basic';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addYear, removeYear, updateYear } from  '../../../../state/sport/years/actions';
import { clearSelectedYear, setSelectedYear } from '../../../../state/sport/year/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { YearModal } from '../YearModal';


export const YearPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const years: Year[] = useSelector((state: RootState) => state.sportyears);
  const year: Year = useSelector((state: RootState) => state.sportyear);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
  const openModalDelete = (year: Year): void => {
    dispatch(setSelectedYear(year));
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (year: Year): void => {
    dispatch(setSelectedYear(year));
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (year: Year): void => {
    dispatch(setSelectedYear(year));
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
    dispatch(addYear(values));
    closeModal();
  };

  const actionChange = async (values: YearNoID) => {
    const yearToChange: Year = {
      ...values,
      id: year.id
    };
    dispatch(updateYear(yearToChange));
    dispatch(clearSelectedYear());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeYear(year.id));
    dispatch(clearSelectedYear());
    closeModal();
  };  

  const actionShow = () => {
    dispatch(clearSelectedYear());
    closeModal();
  };  

  const ShowTableHeader: React.FC = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{ backgroundColor, width: '55%' }} className='center aligned'>Jahr</Table.HeaderCell>
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
            <Table.Cell style={{ backgroundColor, width: '55%' } } className='left aligned'>{year.name}</Table.Cell>
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
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <YearModal
        edittype={Edittype.SHOW}
        title={'Jahr ' + year.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <YearModal
        edittype={Edittype.EDIT}
        title={'Jahr ' + year.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
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