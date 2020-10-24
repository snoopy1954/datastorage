import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeTongues } from '../../state/book/tonguelist/actions';
import { initializeFormats } from '../../state/book/formatlist/actions';
import { initializeOwnerships } from '../../state/book/ownershiplist/actions';
import { initializeBookgroups } from '../../state/book/bookgrouplist/actions';
import { initializeBooks } from '../../state/book/booklist/actions';

import { AppHeaderH2 } from "../basic/header";
import { AppMenu, Item } from "../basic/menu";
import { backgroundColor, styleMainMenu } from "../../constants";

import BookListPage from "./book/BookListPage";
import BookgroupListPage from "./bookgroup/BookgroupListPage";
import OwnershipListPage from "./ownership/OwnershipListPage";
import FormatListPage from "./format/FormatListPage";
import TongueListPage from "./tongue/TongueListPage";


const Book: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  React.useEffect(() => {
    dispatch(initializeBookgroups());
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
 
  const handleSelection = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };

  const buttons: Item[] = 
  [
    {
      name: 'books',
      title: 'Bücher',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'bookgroup',
      title: 'Gruppe',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'ownership',
      title: 'Besitz',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'format',
      title: 'Format',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'tongue',
      title: 'Sprache',
      color: 'blue',
      onClick: handleSelection
    },      
  ];

  return (
    <div className="App">
      <AppHeaderH2 text='Bücher' icon='book'/>
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      {subpage==='books'&&<BookListPage/>}
      {subpage==='bookgroup'&&<BookgroupListPage/>}
      {subpage==='ownership'&&<OwnershipListPage/>}
      {subpage==='format'&&<FormatListPage/>}
      {subpage==='tongue'&&<TongueListPage/>}
    </div>
  );
}
    
export default Book;
    