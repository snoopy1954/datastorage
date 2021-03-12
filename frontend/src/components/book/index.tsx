import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Group } from '../../../../backend/src/types/basic';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeTongues } from '../../state/book/tongues/actions';
import { initializeFormats } from '../../state/book/formats/actions';
import { initializeOwnerships } from '../../state/book/ownerships/actions';
import { initializeGroups } from '../../state/groups/actions';
import { initializeBooks } from '../../state/book/books/actions';

import { AppHeaderH2 } from '../basic/header';

import { BookPage } from './book/BookPage';
import { OwnershipPage } from './ownership/OwnershipPage';
import { FormatPage } from './format/FormatPage';
import { TonguePage } from './tongue/TonguePage';
import { GroupPage } from '../basic/group/GroupPage';

import { getAllDB, createDB, updateDB, removeDB } from '../../utils/book/group';


const Book: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  React.useEffect(() => {
    const fetchGroups = async () => {
      const groups: Group[] = await getAllDB();
      dispatch(initializeGroups(groups));
    }
    fetchGroups();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeOwnerships());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeFormats());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeTongues());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeBooks());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'books' }));
  }, [mainpage, dispatch]);
 
  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Bücher' icon='book'/>
      <Button style={styleButton} onClick={() => actionSelect('books')}>Bücher</Button>
      <Button style={styleButton} onClick={() => actionSelect('groups')}>Gruppe</Button>
      <Button style={styleButton} onClick={() => actionSelect('ownership')}>Besitz</Button>
      <Button style={styleButton} onClick={() => actionSelect('format')}>Format</Button>
      <Button style={styleButton} onClick={() => actionSelect('tongue')}>Sprache</Button>
      {subpage==='books'&&<BookPage/>}
      {subpage==='groups'&&<GroupPage title='Buchgruppe' createGroupDB={createDB} updateGroupDB={updateDB} removeGroupDB={removeDB}/>}
      {subpage==='ownership'&&<OwnershipPage/>}
      {subpage==='format'&&<FormatPage/>}
      {subpage==='tongue'&&<TonguePage/>}
    </div>
  );
}
    
export default Book;
    