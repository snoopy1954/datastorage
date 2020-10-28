import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Year, MonthNoID } from '../../../../backend/src/types/pressure';

import { RootState } from '../../state/store';
import { setYearList } from '../../state/pressure/yearlist/actions';
import { setSelectedYear } from '../../state/pressure/selectedyear/actions';
import { addMonth, initializeMonths } from  '../../state/pressure/monthlist/actions';
import { clearSelectedMonth } from '../../state/pressure/selectedmonth/actions';
import { clearSelectedDay } from '../../state/pressure/selectedday/actions';

import { AppHeaderH2 } from "../basic/header";
import { AppMenu, Item } from "../basic/menu";
import { AskModal } from "../basic/askModal";

import { getCurrentYear, getYearsFromMonths, getNextMonth, getPromptForNextMonth } from "../../utils/pressure";
import { backgroundColor, styleMainMenu } from "../../constants";

import MonthListPage from "../pressure/month/MonthListPage";


const Pressure: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const year = useSelector((state: RootState) => state.selectedyear);      
  const years = useSelector((state: RootState) => state.yearlist);      
  const months = useSelector((state: RootState) => state.monthlist);      

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    dispatch(initializeMonths());
  }, [dispatch]);

  React.useEffect(() => {
    const supportedYears: Year[] = getYearsFromMonths(Object.values(months));
    dispatch(setYearList(supportedYears));
  }, [dispatch, months]);

  React.useEffect(() => {
    const year: Year = years[+(getCurrentYear())];
    dispatch(setSelectedYear(year));
  }, [dispatch, years]);

  React.useEffect(() => {
     dispatch(clearSelectedDay());
     dispatch(clearSelectedMonth());
  }, [dispatch]);

  const handleSelectedYear = (year: string) => {
    dispatch(setSelectedYear(years[+year]));
  }

  const submitNewMonth = async () => {
    if (year) {
      const nextMonth: MonthNoID = getNextMonth(year);
      dispatch(addMonth(nextMonth));
    }
    closeModal();
  };

  const buttons: Item[] = Object.keys(years).map((year: string) => (
    {
      name: year,
      title: year,
      color: 'blue',
      onClick: handleSelectedYear
    }
  ));

  if (year.isLastYear)
  buttons[buttons.length] = {
    name: 'Neu',
    title: 'Neu',
    color: 'blue',
    onClick: openModal
  };

  return (
    <div className="App">
        <AppHeaderH2 text='Blutdruck' icon='heartbeat'/>
        <AskModal
          header='Neuen Monat anlegen'
          prompt={getPromptForNextMonth(year)}
          modalOpen={modalOpen}
          onSubmit={submitNewMonth}
          onClose={closeModal}
        />
        <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
        <MonthListPage/>
    </div>
  );
}

export default Pressure;
