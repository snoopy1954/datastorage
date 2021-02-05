import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Year, YearNoID } from '../../../../backend/src/types/pressure';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeYears, addYear, updateYear } from '../../state/pressure/yearlist/actions';
import { clearSelectedYear } from '../../state/pressure/selectedyear/actions';
import { setOpenedYear } from '../../state/pressure/openedyear/actions';
import { initializeMonths } from  '../../state/pressure/monthlist/actions';
import { clearSelectedMonth } from '../../state/pressure/selectedmonth/actions';

import { AppHeaderH2 } from '../basic/header';
import { YearPage } from '../pressure/year/YearPage';
import { MonthPage } from '../pressure/month/MonthPage';

import { newYear, getYear } from '../../utils/pressure/year';
import { getCurrentYear } from '../../utils/basic';


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
     dispatch(clearSelectedMonth());
     dispatch(clearSelectedYear());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'months' }));
  }, [mainpage, dispatch]);

  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };
 
  return (
    <div className='App'>
        <AppHeaderH2 text='Blutdruck' icon='heartbeat'/>
        <Button style={styleButton} onClick={() => actionSelect('months')}>Monate</Button>
        <Button style={styleButton} onClick={() => actionSelect('years')}>Jahr</Button>
        {subpage==='months'&&<MonthPage/>}
        {subpage==='years'&&<YearPage/>}
    </div>
  );
}

export default Pressure;
