import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { Year, YearNoID } from '../../../../../../backend/src/types/pressure';

import { RootState } from '../../../../state/store';
import { addYear, removeYear, updateYear } from  '../../../../state/pressure/yearlist/actions';
import { clearSelectedYear, setSelectedYear } from '../../../../state/pressure/selectedyear/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { YearModal } from '../YearModal';


export const YearPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const years: Year[] = useSelector((state: RootState) => state.yearlist);
  const year: Year = useSelector((state: RootState) => state.selectedyear);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (year: Year): Promise<void> => {
    dispatch(setSelectedYear(year));
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = async (year: Year): Promise<void> => {
    dispatch(setSelectedYear(year));
    setModalOpen([false, false, true, false]);
  };

  const openModalShow = async (year: Year): Promise<void> => {
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
      
  const actionShow = () => {
    dispatch(clearSelectedYear());
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

  const ShowTableHeader: React.FC = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{ backgroundColor, width: '35%' }} className='center aligned'>Jahr</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Letzter Monat</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Letztes Jahr</Table.HeaderCell>
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
            <Table.Cell style={{ backgroundColor, width: '35%' } } className='left aligned'>{year.name.name}</Table.Cell>
            <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{year.lastMonth}</Table.Cell>
            <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{year.isLastYear ? 'ja' : 'nein'}</Table.Cell>
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
    <div className='App'>
      <YearModal
        edittype={Edittype.ADD}
        title='Neues Jahr anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <YearModal
        edittype={Edittype.SHOW}
        title={'Jahr ' + year.name.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <YearModal
        edittype={Edittype.EDIT}
        title={'Jahr ' + year.name.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Abrechnung löschen'
        prompt={'Abrechnung ' + year.name.name + ' löschen?'}
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
};

export default YearPage;