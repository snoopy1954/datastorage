import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Year, YearNoID } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';
import { addYear, updateYear, removeYear } from '../../../../state/basic/years/actions';

import { AppHeaderH3 } from '../../header';
import { AskModal } from "../../askModal";
import { YearModal } from '../YearModal';

import { emptyYear } from '../../../../utils/basic/year';


interface Props {
  title: string;
  createYearDB: (year: YearNoID) => Promise<Year>;
  updateYearDB: (year: Year) => Promise<Year>;
  removeYearDB: (id: string) => Promise<void>;
};

export const YearPage: React.FC<Props> = ({ title, createYearDB, updateYearDB, removeYearDB }: Props) => {
  const [year, setYear] = useState<Year>(emptyYear());
  const [modalOpen, setModalOpen] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const years: Year[] = useSelector((state: RootState) => state.years);

  const dispatch = useDispatch();

  const openModalNew = (): void => {
    setModalOpen([true, false, false, false]);
  };
  
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
    const year: Year = await createYearDB(values);
    dispatch(addYear(year));
    closeModal();
  };
          
  const actionShow = () => {
    setYear(emptyYear());
    closeModal();
  };  
  
  const actionChange = async (values: YearNoID) => {
    const yearToChange: Year = {
      ...values,
      id: year.id
    };
    const yearChanged: Year = await updateYearDB(yearToChange);
    dispatch(updateYear(yearChanged));
    setYear(emptyYear());
    closeModal();
  };
  
  const actionDelete = async () => {
    await removeYearDB(year.id);
    dispatch(removeYear(year.id));
    setYear(emptyYear());
    closeModal();
  };  

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '55%' }} className='center aligned'>Name</Table.HeaderCell>
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
        title='Gruppe anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        year={year}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <YearModal
        edittype={Edittype.SHOW}
        title={`${title} '${year.name}' anzeigen`}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        year={year}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <YearModal
        edittype={Edittype.EDIT}
        title={`${title} '${year.name}' ändern`}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        year={year}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header={`${title} löschen`}
        prompt={`${title} '${year.name}' löschen`}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={`${title}`} icon='list'/>
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