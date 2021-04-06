import React, { useState }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Input } from 'semantic-ui-react';
import { backgroundColor, styleButton, styleButtonSmall } from '../../../../constants';

import { Book, BookNoID, Tongue } from '../../../../../../backend/src/types/book';
import { Group } from '../../../../../../backend/src/types/basic';
import { Content2 } from '../../../../../../backend/src/types/basic';
import { Filter, BookWithContentNoID } from '../../../../types/book';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addBook, updateBook, exchangeBooks, removeBook } from '../../../../state/book/books/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { BookModal } from '../BookModal';

import { booklistTitle, booklistFilter, newFilter, emptyBook } from '../../../../utils/book/book';
import { createContent, updateContent, removeContent } from '../../../../utils/basic/content';


export const BookPage: React.FC = () => {
  const [book, setBook] = useState<Book>(emptyBook());
  const [filter, setFilter] = useState<Filter>(newFilter());
  const [booksChanged, setBooksChanged] = useState<Array<Book>>([]);
  const [modalOpen, setModalOpen] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);

  const dispatch = useDispatch();

  const books: Book[] = useSelector((state: RootState) => state.books);
  const groups: Group[] = useSelector((state: RootState) => state.groups);      
  const tongues: Tongue[] = useSelector((state: RootState) => state.tongues);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = (book: Book): void => {
    setBook(book);
    setModalOpen([false, true, false, false]);
  };
      
  const openModalChange = (book: Book): void => {
    setBook(book);
    setModalOpen([false, false, true, false]);
  };
      
  const openModalShow = (book: Book): void => {
    setBook(book);
    setModalOpen([false, false, false, true]);
  };
  
  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3
  };

  const closeModal = (): void => {
      setModalOpen([false, false, false, false]);
  };

  const actionSelectedGroup = (selection: string) => {
    setFilter({ ...filter, group: selection, subgroup: '' });
  };

  const actionSelectedSubgroup = (selection: string) => {
    setFilter({ ...filter, subgroup: selection });
  };

  const actionSelectedTongue = (selection: string) => {
    setFilter({ ...filter, tongue: selection });
  };

  const actionNameInput = (name: string) => {
    setFilter({ ...filter, author: name });
  };

  const actionClearNameInput = () => {
    setFilter({ ...filter, author: '' });
  };

  const actionAdd = async (values: BookWithContentNoID) => {
    const bookToAdd: BookNoID = {
      ...values
    };
    const contentWithFile = values.contentwithfile;
    const content: Content2 = await createContent(contentWithFile, 'jpg');
    bookToAdd.content = content;
    dispatch(addBook(bookToAdd));
    closeModal();
  };

  const actionChange = async (values: BookWithContentNoID) => {
    const bookToChange: Book = {
      ...values,
      id: book.id
    };
    const contentWithFile = values.contentwithfile;
    if (contentWithFile.file.size>0) {
      const content: Content2 = await updateContent(book.content.dataId, contentWithFile, 'jpg');
      bookToChange.content = content;  
    }
    dispatch(updateBook(bookToChange));
    setBook(emptyBook());
    closeModal();
  };

  const actionDelete = async () => {
    await removeContent(book.content.dataId, 'jpg');
    dispatch(removeBook(book.id));
    setBook(emptyBook());
    closeModal();
  };  

  const actionShow = () => {
    setBook(emptyBook());
    closeModal();
  };

  const actionUpDown = (direction: string, index: number, list: Book[]) => {
    if ((direction===Direction.UP && index===0) || (direction===Direction.DOWN && index===list.length-1)) return;
      
    const book1: Book = list[index]; 
    const book2: Book = direction===Direction.UP ? list[index-1] : list[index+1];
    const seqnr1 = book1.title.seqnr;
    const seqnr2 = book2.title.seqnr;
    book1.title.seqnr = seqnr2;
    book2.title.seqnr = seqnr1;
    const booksToChange: Book[] = [book1, book2];
    dispatch(exchangeBooks(booksToChange));
    setBooksChanged(arr => [...arr, book1]);
    setBooksChanged(arr => [...arr, book2]);
  };

  const actionSaveSequence = () => {
    Object.values(booksChanged).forEach(bookChanged => {
      dispatch(updateBook(bookChanged));
    });
    setBooksChanged([]);
  };

  const bookgroupOptions: string[] = [];
  Object.values(groups).forEach(element => {
    bookgroupOptions.push(element.name)
  });

  const tongueOptions: string[] = [];
  Object.values(tongues).forEach(element => {
    tongueOptions.push(element.name)
  });

  const getBookgroup = (bookgroupName: string): Group | undefined => {
    const bookgroup = Object.values(groups).filter(bookgroup => bookgroup.name===bookgroupName);
    return bookgroup.length > 0 ? bookgroup[0] : undefined;
  };

  const subgroupOptions: string[] = [];
  const bookgroup = getBookgroup(filter.group);
  if (bookgroup) {
    bookgroup.subgroups.forEach(element => {
      subgroupOptions.push(element);
    });
  };

  const filterSelected = (filter.group!=='' && filter.subgroup!=='') || (filter.group!=='' && getBookgroup(filter.group)?.subgroups.length===0);
  const sequenceChanged = (Object.values(booksChanged).length > 0);
  const title = 'Bücherliste' + booklistTitle(filter);
  const sortedBooks = booklistFilter(books, filter, groups);

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '25%' } } className='center aligned'>Buchtitel</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Autor</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Sprache</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Auf/Ab</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(sortedBooks).map((book: Book, index: number) => (
            <Table.Row key={book.id}>
              <Table.Cell style={{ backgroundColor, width: '25%' } } className='left aligned'>{book.title.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='left aligned'>{book.author.givenname} {book.author.familyname}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{book.tongue}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='center aligned'>
                <Button className="ui icon button" style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.UP, index, sortedBooks) }>
                  <i className="angle up icon"></i>
                </Button>
                <Button className="ui icon button" style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.DOWN, index, sortedBooks) }>
                  <i className="angle down icon"></i>
                </Button>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(book)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(book)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(book)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
  };

  return (
    <div className='App'>
      <BookModal
        edittype={Edittype.ADD}
        title='Neues Buch anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        book={book}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <BookModal
        edittype={Edittype.SHOW}
        title={'Buch ' + book.title.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        book={book}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <BookModal
        edittype={Edittype.EDIT}
        title={'Buch ' + book.title.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        book={book}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Buch löschen'
        prompt={'Buch ' + book.title.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={title} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectedGroup(event.currentTarget.value)}>
        <option value="" style={styleButton}>Gruppe</option>
        {bookgroupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectedSubgroup(event.currentTarget.value)}>
        <option value="" style={styleButton}>U.Gruppe</option>
        {subgroupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectedTongue(event.currentTarget.value)}>
        <option value="" style={styleButton}>Sprache</option>
        {tongueOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Input placeholder='Name' onChange={(event: React.FormEvent<HTMLInputElement>) => actionNameInput(event.currentTarget.value)}></Input>
      <Button style={styleButton} onClick={() => actionClearNameInput()}>Löschen</Button>
      <Button style={styleButton} disabled={!sequenceChanged} onClick={() => actionSaveSequence()}>Speichern</Button>
      {sortedBooks.length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {sortedBooks.length>8&&
          <div style={{ overflowY: 'scroll', height: '550px' }}>
            <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
              <ShowTableBody/>
            </Table>
          </div>
      }
      {sortedBooks.length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
          <ShowTableHeader/>
          <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default BookPage;