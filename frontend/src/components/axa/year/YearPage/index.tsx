import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Year, YearNoID } from '../../../../../../backend/src/types/axa';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addYear, removeYear, updateYear } from  '../../../../state/axa/years/actions';
import { clearSelectedYear, setSelectedYear } from '../../../../state/axa/year/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { YearModal } from '../YearModal';


export const YearPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
    const dispatch = useDispatch();

    const years: Year[] = useSelector((state: RootState) => state.axayears);
    const year: Year = useSelector((state: RootState) => state.axayear);

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
            header='Jahr löschen'
            prompt={'Jahr ' + year.name.name + ' löschen?'}
            modalOpen={modalOpen[ModalDialog.DELETE]}
            onSubmit={actionDelete}
            onClose={closeModal}
          />
          <AppHeaderH3 text='Jahre' icon='list'/>
          <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Jahr</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Vital750 Rest</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Z100S Rest</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Aktion</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(years).map((year: Year) => (
                <Table.Row key={year.id}>
                  <Table.Cell>{year.name.name}</Table.Cell>
                  <Table.Cell>{year.vital750}</Table.Cell>
                  <Table.Cell>{year.z100s}</Table.Cell>
                  <Table.Cell>
                    <Button style={styleButton} onClick={() => openModalShow(year)}>Anzeigen</Button>
                    <Button style={styleButton} onClick={() => openModalChange(year)}>Ändern</Button>
                    <Button style={styleButton} onClick={() => openModalDelete(year)}>Löschen</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default YearPage;