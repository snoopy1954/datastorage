import React from 'react';

import { useStateValue, 
         setBookList, 
         setBookgroupList, 
         setOwnershipList, 
         setFormatList, 
         setTongueList, 
         setPage, 
       } from "../../state";
import { getAll as getAllBooks } from "../../services/book/books";
import { getAll as getAllBookgroups } from "../../services/book/bookgroups";
import { getAll as getAllOwnerships } from "../../services/book/ownerships";
import { getAll as getAllFormats } from "../../services/book/formats";
import { getAll as getAllTongues } from "../../services/book/tongues";
import BookListPage from "./book/BookListPage";
import BookgroupListPage from "./bookgroup/BookgroupListPage";
import OwnershipListPage from "./ownership/OwnershipListPage";
import FormatListPage from "./format/FormatListPage";
import TongueListPage from "./tongue/TongueListPage";
import { AppHeaderH2 } from "../basic/header";
import { AppMenu, Item } from "../basic/menu";
import { backgroundColor, styleMainMenu } from "../../constants";


const Book: React.FC = () => {
  const [{ page }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchBookgroupList = async () => {
      const bookgroups = await getAllBookgroups();
      dispatch(setBookgroupList(bookgroups));
    };
    fetchBookgroupList();

    const fetchOwnershipList = async () => {
      const ownerships = await getAllOwnerships();
      dispatch(setOwnershipList(ownerships));
    };
    fetchOwnershipList();

    const fetchFormatList = async () => {
      const formats = await getAllFormats();
      dispatch(setFormatList(formats));
    };
    fetchFormatList();

    const fetchTongueList = async () => {
      const tongues = await getAllTongues();
      dispatch(setTongueList(tongues));
    };
    fetchTongueList();

    const fetchBookList = async () => {
      const books = await getAllBooks();
      dispatch(setBookList(books));
    };
    fetchBookList();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage('books'));
  }, [dispatch]);
 
  const handleSelection = (selected: string) => {
      dispatch(setPage(selected));
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
      {page==='books'&&<BookListPage/>}
      {page==='bookgroup'&&<BookgroupListPage/>}
      {page==='ownership'&&<OwnershipListPage/>}
      {page==='format'&&<FormatListPage/>}
      {page==='tongue'&&<TongueListPage/>}
    </div>
  );
}
    
export default Book;
    