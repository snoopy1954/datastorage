import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeYears } from '../../state/pressure/years/actions';
import { initializeMonths } from  '../../state/pressure/months/actions';

import { AppHeaderH2 } from '../basic/header';
import { YearPage } from '../pressure/year/YearPage';
import { MonthPage } from '../pressure/month/MonthPage';


const Pressure: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);

  React.useEffect(() => {
    dispatch(initializeMonths());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeYears());
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
