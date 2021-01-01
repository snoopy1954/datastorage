import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backgroundColor, styleMainMenu } from "../../constants";

import { Year, YearNoID } from '../../../../backend/src/types/pressure';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeYears, addYear, updateYear } from '../../state/pressure/yearlist/actions';
import { clearSelectedYear } from '../../state/pressure/selectedyear/actions';
import { setOpenedYear } from '../../state/pressure/openedyear/actions';
import { initializeMonths } from  '../../state/pressure/monthlist/actions';
import { clearSelectedMonth } from '../../state/pressure/selectedmonth/actions';
import { clearSelectedDay } from '../../state/pressure/selectedday/actions';

import { AppHeaderH2 } from "../basic/header";
import { YearListPage } from '../pressure/year/YearListPage';
import { MonthListPage } from "../pressure/month/MonthListPage";
import { AppMenu, Item } from "../basic/menu";

import { getCurrentYear, newYear, getYear } from "../../utils/pressure";


const Pressure: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);
  const years = useSelector((state: RootState) => state.yearlist);      

  React.useEffect(() => {
    dispatch(initializeMonths());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeYears());
  }, [dispatch]);

  React.useEffect(() => {
    if (years.length!==0) {
      const currentYearName: number = +(getCurrentYear());
      const currentYear: Year = getYear(years, String(currentYearName));
      if (currentYear.id==='') {
        const oldYear: Year = getYear(years, String(currentYearName-1));
        oldYear.isLastYear = false;
        const currentYear: YearNoID = newYear(years);
        dispatch(addYear(currentYear));
        dispatch(updateYear(oldYear));
      }
      else {
        dispatch(setOpenedYear(currentYear));
      }
    }
  }, [dispatch, years]);

  React.useEffect(() => {
     dispatch(clearSelectedDay());
     dispatch(clearSelectedMonth());
     dispatch(clearSelectedYear());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'months' }));
  }, [mainpage, dispatch]);

  const handleSelection = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };
 
  const buttons: Item[] = 
  [
    {
      name: 'months',
      title: 'Monate',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'years',
      title: 'Jahr',
      color: 'blue',
      onClick: handleSelection
    },
  ];

  return (
    <div className="App">
        <AppHeaderH2 text='Blutdruck' icon='heartbeat'/>
        <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
        {subpage==='months'&&<MonthListPage/>}
        {subpage==='years'&&<YearListPage/>}
    </div>
  );
}

export default Pressure;
