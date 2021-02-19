import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton, styleButtonSmall } from '../../../../constants';

import { Book, BookNoID, BookWithFileNoID, Bookgroup, Content, Tongue } from '../../../../../../backend/src/types/book';
import { Image } from '../../../../../../backend/src/types/image';
import { Filter } from '../../../../types/book';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { setFilter, clearFilter } from '../../../../state/book/filter/actions';
import { setImage } from '../../../../state/image/actions';
import { addBook, updateBook, exchangeBooks, removeBook } from '../../../../state/book/booklist/actions';
import { setSelectedBook, clearSelectedBook } from '../../../../state/book/selectedbook/actions';
import { addChangedBook, clearChangedBook } from '../../../../state/book/changedbooklist/actions';

import { create, update } from '../../../../services/image/images';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { AskString, Value } from '../../../basic/askString';
import { BookModal } from '../BookModal';

import { getContent } from '../../../../utils/image';
import { booklistTitle, booklistFilter, nextSeqnr } from '../../../../utils/book/book';


export const BookPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false]);
  const dispatch = useDispatch();

  const bookgroups: Bookgroup[] = useSelector((state: RootState) => state.bookgroups);      
  const tongues: Tongue[] = useSelector((state: RootState) => state.tongues);      
  const filters: Filter = useSelector((state: RootState) => state.filters);
  const books: Book[] = useSelector((state: RootState) => state.books);
  const book: Book = useSelector((state: RootState) => state.book);
  const changedBooks: Book[] = useSelector((state: RootState) => state.changedbooklist);

  React.useEffect(() => {
    dispatch(clearSelectedBook());
    dispatch(clearFilter());
  }, [dispatch]);  
  
  const openModalNew = (): void => setModalOpen([true, false, false, false, false]);

  const openModalDelete = (book: Book): void => {
    dispatch(setSelectedBook(book));
    setModalOpen([false, true, false, false, false]);
  };
      
  const openModalChange = (book: Book): void => {
    dispatch(setSelectedBook(book));
    setModalOpen([false, false, true, false, false]);
  };
      
  const openModalShow = (book: Book): void => {
    dispatch(setSelectedBook(book));
    const id: string = book.content.dataId;
    dispatch(setImage(id));
    setModalOpen([false, false, false, true, false]);
  };
  
  const openModalAuthor = (): void => setModalOpen([false, false, false, false, true]);

  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
    AUTHOR = 4,
  };

  const closeModal = (): void => {
      setModalOpen([false, false, false, false, false]);
  };

  const actionSelectionClick = (filter: string, selection: string) => {
    switch (filter) {
      case 'Gruppe':
        dispatch(setFilter({
          ...filters, 
          group: selection,
          subgroup: ''
        }));
        break;
      case 'Untergruppe':
        dispatch(setFilter({
          ...filters, 
          subgroup: selection
        }));
        break;
      case 'Sprache':
        dispatch(setFilter({
          ...filters, 
          tongue: selection
        }));
        break;
      default:
    }
  };

  const actionSelectedAuthor = (author: Value) => {
    dispatch(setFilter({ 
      ...filters, 
      author: author.value }));
    closeModal();
  };

  const actionAdd = async (values: BookWithFileNoID) => {
    const filedata: ArrayBuffer = await getContent(values.file);
    const longInt8View: Uint8Array = new Uint8Array(filedata);
    const newImage: Image = await create(longInt8View);
    const id: string = newImage.id;
    const content: Content = {
      filename: values.file.name,
      filetype: values.file.type,
      filesize: String(values.file.size),
      dataId: id
    };
    await update(id, content);
    const seqnr = values.title.seqnr===0 ? nextSeqnr(books, values.bookgroup, values.subgroup)+1 : values.title.seqnr;
    const book: BookNoID = {
      title: { name: values.title.name, seqnr: seqnr },
      author: { givenname: values.author.givenname, familyname: values.author.familyname },
      comment: values.comment,
      link: values.link,
      launched: values.launched,
      read: values.read,
      createdAt: values.createdAt,
      modifiedAt: values.modifiedAt,
      bookgroup: values.bookgroup,
      subgroup: values.subgroup,
      ownership: values.ownership,
      format: values.format,
      tongue: values.tongue,
      content: content
    };
    dispatch(addBook(book));
    closeModal();
  };

  const actionChange = async (values: BookNoID) => {
    const bookToChange: Book = {
      ...values,
      id: book.id
    };
    dispatch(updateBook(bookToChange));
    dispatch(clearSelectedBook());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeBook(book.id));
    dispatch(clearSelectedBook());
    closeModal();
  };  

  const actionShow = () => {
    dispatch(clearSelectedBook());
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
    dispatch(addChangedBook(book1));
    dispatch(addChangedBook(book2));
  };

  const actionSaveSequence = () => {
    Object.values(changedBooks).forEach(changedBook => {
      dispatch(updateBook(changedBook));
    });
    dispatch(clearChangedBook());
  };

  const bookgroupOptions: string[] = [];
  Object.values(bookgroups).forEach(element => {
    bookgroupOptions.push(element.name)
  });

  const tongueOptions: string[] = [];
  Object.values(tongues).forEach(element => {
    tongueOptions.push(element.name)
  });

  const getBookgroup = (bookgroupName: string): Bookgroup | undefined => {
    const bookgroup = Object.values(bookgroups).filter(bookgroup => bookgroup.name===bookgroupName);
    return bookgroup.length > 0 ? bookgroup[0] : undefined;
  };

  const subgroupOptions: string[] = [];
  const bookgroup = getBookgroup(filters.group);
  if (bookgroup) {
    bookgroup.subgroups.forEach(element => {
      subgroupOptions.push(element);
    });
  };

  const filterSelected = (filters.group!=='' && filters.subgroup!=='') || (filters.group!=='' && getBookgroup(filters.group)?.subgroups.length===0);
  const sequenceChanged = (Object.values(changedBooks).length > 0);
  const title = 'Bücherliste' + booklistTitle(filters);
  const sortedBooks = booklistFilter(books, filters, bookgroups);

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
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <BookModal
        edittype={Edittype.SHOW}
        title={'Buch ' + book.title.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <BookModal
        edittype={Edittype.EDIT}
        title={'Buch ' + book.title.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskString
        header='Autor eingeben'
        prompt='Autor eingeben'
        modalOpen={modalOpen[ModalDialog.AUTHOR]}
        onSubmit={actionSelectedAuthor}
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
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Gruppe', event.currentTarget.value)}>
        <option value="" style={styleButton}>Gruppe</option>
        {bookgroupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Untergruppe', event.currentTarget.value)}>
        <option value="" style={styleButton}>U.Gruppe</option>
        {subgroupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Sprache', event.currentTarget.value)}>
        <option value="" style={styleButton}>Sprache</option>
        {tongueOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button style={styleButton} onClick={() => openModalAuthor()}>Author</Button>
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