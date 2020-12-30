import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";

import { Book, BookNoID, BookWithFileNoID, Bookgroup, Content, Tongue } from '../../../../../../backend/src/types/book';
import { Image } from '../../../../../../backend/src/types/image';
import { Filter } from "../../../../types/book";
import { Edittype, Direction } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { setFilter, clearFilter } from '../../../../state/book/filter/actions';
import { setImage } from '../../../../state/image/actions';
import { addBook, updateBook, exchangeBooks } from '../../../../state/book/booklist/actions';
import { setSelectedBook, clearSelectedBook } from '../../../../state/book/selectedbook/actions';
import { addChangedBook, clearChangedBook } from '../../../../state/book/changedbooklist/actions';
import { setSortButton, clearSortButton } from '../../../../state/address/sortbutton/actions';

import { create, update } from "../../../../services/image/images";

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenuOpt, ItemOpt } from "../../../basic/menu";
import { AskString, Value } from "../../../basic/askString";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { getContent } from "../../../../utils/image";
import { booklistTitle, booklistFilter, nextSeqnr } from "../../../../utils/book";

import BookDetailsPage from "../BookDetailsPage";
import AddBookModal from "../AddBookModal";


const BookListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<[boolean, boolean]>([false, false]);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage: string = useSelector((state: RootState) => state.page.mainpage);      
    const bookgroups: Bookgroup[] = useSelector((state: RootState) => state.bookgroups);      
    const tongues: Tongue[] = useSelector((state: RootState) => state.tongues);      
    const filters: Filter = useSelector((state: RootState) => state.filters);
    const books: Book[] = useSelector((state: RootState) => state.books);
    const book: Book = useSelector((state: RootState) => state.book);
    const changedBooks: Book[] = useSelector((state: RootState) => state.changedbooklist);
    const sortbutton: boolean = useSelector((state: RootState) => state.sortbutton);

    React.useEffect(() => {
      dispatch(clearSelectedBook());
      dispatch(clearSortButton());
      dispatch(clearFilter());
    }, [dispatch]);  
  
    const openModalNew = (): void => setModalOpen([true, false]);
    const openModalAuthor = (): void => setModalOpen([false, true]);
    enum ModalDialog {
      NEW = 0,
      AUTHOR = 1,
    };  
    const closeModal = (): void => {
        setModalOpen([false, false]);
        setError(undefined);
    };

    const handleSelection = async (book: Book) => {
        const id: string = book.content.dataId;
        dispatch(setImage(id));
        dispatch(setSelectedBook(book));
    };

    const handleSelectionClick = (filter: string, selection: string) => {
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

    const handleSelectedAuthor = (author: Value) => {
      dispatch(setFilter({ 
        ...filters, 
        author: author.value }));
      closeModal();
    };

    const handleNewBook = async (values: BookWithFileNoID) => {
        const filedata: ArrayBuffer = await getContent(values.file);
        const longInt8View: Uint8Array = new Uint8Array(filedata);
        const newImage: Image = await create(longInt8View);
        const id: string = newImage.id;
        const content: Content = {
          filename: values.file.name,
          filetype: values.file.type,
          filesize: String(values.file.size),
          dataId: id
        }
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

    const handleClose = () => {
      dispatch(clearFilter());
      dispatch(clearSortButton());
      dispatch(setPage({ mainpage, subpage: 'books' }));
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleDummy = () => {
    };

    const handleUpDown = (direction: string, index: number, list: Book[]) => {
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

    const saveSequence = () => {
      Object.values(changedBooks).forEach(changedBook => {
        dispatch(updateBook(changedBook));
      });
      dispatch(clearChangedBook());
      dispatch(clearSortButton());
    };

    const handleSort = () => {
      dispatch(setSortButton());
    };

    const bookgroupOptions: string[] = [];
    Object.values(bookgroups).forEach(element => {
      bookgroupOptions.push(element.groupname.name)
    });

    const tongueOptions: string[] = [];
    Object.values(tongues).forEach(element => {
      tongueOptions.push(element.tonguename.name)
    });

    const getBookgroup = (bookgroupName: string): Bookgroup | undefined => {
      const bookgroup = Object.values(bookgroups).filter(bookgroup => bookgroup.groupname.name===bookgroupName);
      return bookgroup.length > 0 ? bookgroup[0] : undefined;
    };

    const subgroupOptions: string[] = [];
    const bookgroup = getBookgroup(filters.group);
    if (bookgroup)
    bookgroup.subgroups.forEach(element => {
      subgroupOptions.push(element);
    });

    const buttons: ItemOpt[] = [
      {
        name: 'Schliessen',
        title: 'Alle',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: handleClose,
        onSelection: handleDummy
      },
      {
        name: 'Gruppe',
        title: 'Gruppe',
        color: 'blue',
        type: '1',
        options: bookgroupOptions,    
        onClick: handleDummy,
        onSelection: handleSelectionClick
      },
      {
        name: 'Untergruppe',
        title: 'Untergruppe',
        color: 'blue',
        type: '1',
        options: subgroupOptions,    
        onClick: handleDummy,
        onSelection: handleSelectionClick
      },
      {
        name: 'Sprache',
        title: 'Sprache',
        color: 'blue',
        type: '1',
        options: tongueOptions,    
        onClick: handleDummy,
        onSelection: handleSelectionClick
      },
      {
        name: 'Autor',
        title: 'Autor',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: openModalAuthor,
        onSelection: handleDummy
      },
      {
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: openModalNew,
        onSelection: handleSelectionClick
      },
    ];

    if ((filters.group!=='' && filters.subgroup!=='') || (filters.group!=='' && getBookgroup(filters.group)?.subgroups.length===0)) {
      buttons[buttons.length] =     {
        name: 'Sortieren',
        title: 'Sortieren',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: handleSort,
        onSelection: handleDummy
      };
    }

    if (Object.values(changedBooks).length > 0) {
      buttons[buttons.length] = {
        name: 'Speichern',
        title: 'Speichern',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: saveSequence,
        onSelection: handleDummy
      };
    }

    if (book.id!=='') {
      return (
        <BookDetailsPage/>
      )
    }

    const title = 'Bücherliste' + booklistTitle(filters);
    const sortedBooks = booklistFilter(books, filters, bookgroups);

    return (
        <div className="App">
          <AppHeaderH3Plus text={title} icon='list'/>
          <AddBookModal
            edittype={Edittype.ADD}
            modalOpen={modalOpen[ModalDialog.NEW]}
            onSubmit={handleNewBook}
            error={error}
            onClose={closeModal}
          />
          <AskString
            header='Autor eingeben'
            prompt='Autor eingeben'
            modalOpen={modalOpen[ModalDialog.AUTHOR]}
            onSubmit={handleSelectedAuthor}
            onClose={closeModal}
          />
          <AppMenuOpt menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Buchtitel</Table.HeaderCell>
                <Table.HeaderCell>Autor</Table.HeaderCell>
                <Table.HeaderCell>Gruppe</Table.HeaderCell>
                <Table.HeaderCell>Untergruppe</Table.HeaderCell>
                <Table.HeaderCell>Sprache</Table.HeaderCell>
                {sortbutton&&<Table.HeaderCell>Reihenfolge</Table.HeaderCell>}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(sortedBooks).map((book: Book, index: number) => (
                <Table.Row key={book.id}>
                  <Table.Cell onClick={() => handleSelection(book)}>{book.title.name}</Table.Cell>
                  <Table.Cell>{book.author.givenname} {book.author.familyname}</Table.Cell>
                  <Table.Cell>{book.bookgroup}</Table.Cell>
                  <Table.Cell>{book.subgroup}</Table.Cell>
                  <Table.Cell>{book.tongue}</Table.Cell>
                  {sortbutton&&<Table.Cell>
                    <Button className="ui icon button" color='green' onClick={() => handleUpDown(Direction.UP, index, sortedBooks) }>
                      <i className="angle up icon"></i>
                    </Button>
                    <Button className="ui icon button" color='green' onClick={() => handleUpDown(Direction.DOWN, index, sortedBooks) }>
                      <i className="angle down icon"></i>
                    </Button>
                  </Table.Cell>}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default BookListPage;