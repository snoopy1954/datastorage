import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from '../../../../types/basic';

import { Month, MonthNoID } from '../../../../../../backend/src/types/pressure';

import { RootState } from '../../../../state/store';
import { initializeMonths,  addMonth, removeMonth, updateMonth } from '../../../../state/pressure/monthlist/actions';
import { setSelectedMonth, clearSelectedMonth } from '../../../../state/pressure/selectedmonth/actions';
import { setOpenedYear } from '../../../../state/pressure/openedyear/actions';

import { create } from '../../../../services/pressure/months';
import { getAll } from '../../../../services/pressure/exchange';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { MonthModal } from '../MonthModal';

import { formatData } from '../../../../utils/pressure/migrate';
import { addStatsToMonth, getNextMonth, getPromptForNextMonth } from '../../../../utils/pressure/month';


export const MonthPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false, false]);
  const dispatch = useDispatch();

  const year = useSelector((state: RootState) => state.openedyear);
  const years = useSelector((state: RootState) => state.yearlist);
  const months = useSelector((state: RootState) => state.monthlist); 
  const month = useSelector((state: RootState) => state.selectedmonth);

  const openModalNew = (): void => setModalOpen([true, false, false, false, false, false]);

  const openModalDelete = async (month: Month): Promise<void> => {
    dispatch(setSelectedMonth(month));
    setModalOpen([false, true, false, false, false, false]);
  };
    
  const openModalChange = async (month: Month): Promise<void> => {
    dispatch(setSelectedMonth(month));
    setModalOpen([false, false, true, false, false, false]);
  };

  const openModalShow = async (month: Month): Promise<void> => {
    dispatch(setSelectedMonth(month));
    setModalOpen([false, false, false, true, false, false]);
  };

  const openModalPrint = async (month: Month): Promise<void> => {
    dispatch(setSelectedMonth(month));
    setModalOpen([false, false, false, false, true, false]);
  };

  const openModalExport = async (month: Month): Promise<void> => {
    dispatch(setSelectedMonth(month));
    setModalOpen([false, false, false, false, false, true]);
  };

  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
    PRINT = 4,
    EXPORT = 5
  };
  
  const closeModal = (): void => {
    setModalOpen([false, false, false, false, false, false]);
  };

  const createOne = async (migrateOne: MonthNoID) => {
    const newMonth = await create(migrateOne);
    dispatch(addMonth(newMonth));
  };

  const actionAdd = async () => {
    if (year) {
      const nextMonth: MonthNoID = getNextMonth(year);
      dispatch(addMonth(nextMonth));
    }
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeMonth(month.id));
    dispatch(clearSelectedMonth());
    closeModal();
  };  

  const actionClose = () => {
    dispatch(clearSelectedMonth());
    closeModal();
  };  

  const actionChange = async (changedMonth: Month) => {
    const addedMonth = addStatsToMonth(changedMonth);
    dispatch(await updateMonth(addedMonth));
    dispatch(clearSelectedMonth());
    dispatch(initializeMonths());
    closeModal();
  };  

  const handleMigrate = async () => {
    const migrateData: MonthNoID[] = formatData(await getAll());
    migrateData.forEach(migrateOne => {
      createOne(migrateOne);
    });
  };

  const actionSelectionClick = ( selection: string) => {
    Object.values(years).forEach(year => {
      if (selection===year.name.name) {
        dispatch(setOpenedYear(year));
      }
    });
  };

  const yearOptions: string[] = [];
  Object.values(years).forEach(element => {
    yearOptions.push(element.name.name);
  });

  return (
    <div className='App'>
      <AskModal
          header='Neuen Monat anlegen'
          prompt={getPromptForNextMonth(year)}
          modalOpen={modalOpen[ModalDialog.NEW]}
          onSubmit={actionAdd}
          onClose={closeModal}
      />
      <MonthModal
        edittype={Edittype.SHOW}
        title={'Monat ' + month.monthname + ' ' + month.year + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionClose}
        onClose={closeModal}
      />
      <MonthModal
        edittype={Edittype.PRINT}
        title={'Monat ' + month.monthname + ' ' + month.year + ' drucken'}
        modalOpen={modalOpen[ModalDialog.PRINT]}
        onSubmit={actionClose}
        onClose={closeModal}
      />
      <MonthModal
        edittype={Edittype.EXPORT}
        title={'Monat ' + month.monthname + ' ' + month.year + ' exportieren'}
        modalOpen={modalOpen[ModalDialog.EXPORT]}
        onSubmit={actionClose}
        onClose={closeModal}
      />
      <MonthModal
        edittype={Edittype.EDIT}
        title={'Monat ' + month.monthname + ' ' + month.year + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Monat löschen'
        prompt={'Monat ' + month.monthname + ' ' + month.year + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={'Monate des Jahres ' + year.name.name} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      {years.length===0&&<Button style={styleButton} onClick={() => handleMigrate()}>Migrate</Button>}
      <Button as='select' className='ui dropdown' style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick(event.currentTarget.value)}>
        <option value='' style={styleButton}>Jahr</option>
        {yearOptions.map((option: string, index: number) => (
          option===year.name.name
          ?<option key={index} selected={true} value={option} style={styleButton}>{option}</option>
          :<option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Monat</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Start- / Endgewicht</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Durchschnitt Gew.</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Durchschnitt Syst.</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Durchschnitt Diast.</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Durchschnitt Puls</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='five wide center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {Object.values(months).map((month: Month) => (
            month.year===year.name.name&&
            <Table.Row key={month.id}>
              <Table.Cell>{month.monthname}</Table.Cell>
              <Table.Cell>{month.weight.start} / {month.weight.end}</Table.Cell>
              <Table.Cell>{month.weight.total}</Table.Cell>
              <Table.Cell>{month.systolic.total}</Table.Cell>
              <Table.Cell>{month.diastolic.total}</Table.Cell>
              <Table.Cell>{month.pulse.total}</Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(month)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(month)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalPrint(month)}>Drucken</Button>
                <Button style={styleButton} onClick={() => openModalExport(month)}>Exportieren</Button>
                <Button style={styleButton} onClick={() => openModalDelete(month)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default MonthPage;