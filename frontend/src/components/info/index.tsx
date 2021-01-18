import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeHistorylines } from  '../../state/info/historylines/actions';

import { AppHeaderH2 } from '../basic/header';
import { HistoryPage } from './history/HistoryPage';

const Info: React.FC = () => {
  const dispatch = useDispatch();
  
  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      
  
  React.useEffect(() => {
    dispatch(initializeHistorylines());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'history' }));
  }, [mainpage, dispatch]);

  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };
    
  return (
    <div className="App">
      <AppHeaderH2 text='Info' icon='info'/>
      <Button style={styleButton} onClick={() => actionSelect('history')}>History</Button>
      <Button style={styleButton} onClick={() => actionSelect('logging')}>Logging</Button>
      <Button style={styleButton} onClick={() => actionSelect('info')}>Info</Button>
      {subpage==='history'&&<HistoryPage/>}
      {subpage==='logging'&&<HistoryPage/>}
      {subpage==='info'&&<HistoryPage/>}
    </div>
  );
};
    
export default Info;
