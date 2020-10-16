import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, 
         addBook, 
         setSelectedBook, 
         setImageUrl, 
         clearSelectedBookgroupSelection, 
         clearSelectedSubgroupSelection, 
         setSelectedBookgroupSelection,
         setSelectedSubgroupSelection, 
         setPage 
       } from "../../../../state";
import { Book, BookNoID, BookWithFileNoID, Bookgroup } from "../../../../types/book";
import { Image } from "../../../../types/image";
import { create as createBook } from "../../../../services/book/books";
import { create as createImage, getOne} from "../../../../services/image/images";
import BookDetailsPage from "../BookDetailsPage";
import AddBookModal from "../AddBookModal";
import { getContent, getImageUrl } from "../../../../utils/image";
import { Edittype } from "../../../../types/basic";
import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenuOpt, ItemOpt } from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";
import { sortBookList } from "../../../../utils/book";


const BookListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [{ books, book, bookgroups, selectedBookgroup, selectedSubgroup }, dispatch] = useStateValue();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelection = async (book: Book) => {
        const id: string = book.content.dataId;
        const retImage: Image = await getOne(id);
        const imageUrl = getImageUrl(retImage);
        dispatch(setImageUrl(imageUrl));
        dispatch(setSelectedBook(book));
    };

    const handleSelectionClick = (filter: string, selection: string) => {
      console.log('set ', filter, selection)
      switch (filter) {
        case 'Gruppe':
          dispatch(setSelectedBookgroupSelection(selection));
          break;
        case 'Untergruppe':
          dispatch(setSelectedSubgroupSelection(selection));
          break;
        default:
        }
    };

    const handleNewBook = async (values: BookWithFileNoID) => {
        const filedata = await getContent(values.file);
        const longInt8View = new Uint8Array(filedata);
        const newImage: Image = await createImage(longInt8View);
        const id = newImage.id;
        const book: BookNoID = {
          title: { name: values.title.name, seqnr: values.title.seqnr },
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
          content: {
            filename: values.file.name,
            filetype: values.file.type,
            filesize: String(values.file.size),
            dataId: id
          }
        }
        const newBook = await createBook(book);
        dispatch(addBook(newBook));
        closeModal();
    };

    const handleClose = () => {
      dispatch(clearSelectedBookgroupSelection());
      dispatch(clearSelectedSubgroupSelection());
      dispatch(setPage('books'));
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleDummy = () => {
    };

    const bookgroupOptions: string[] = [];
    Object.values(bookgroups).forEach(element => {
      bookgroupOptions.push(element.groupname.name)
    });

    const getBookgroup = (bookgroupName: string): Bookgroup | undefined => {
      const bookgroup = Object.values(bookgroups).filter(bookgroup => bookgroup.groupname.name===bookgroupName);
      return bookgroup.length > 0 ? bookgroup[0] : undefined;
    };

    const subgroupOptions: string[] = [];
    const bookgroup = getBookgroup(selectedBookgroup);
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
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: openModal,
        onSelection: handleSelectionClick
      },
    ];

    if (book) {
      return (
        <BookDetailsPage/>
      )
    }

    let filter = (selectedBookgroup!=="") ? ': ' + selectedBookgroup : '';
    filter += (selectedSubgroup!=="") ? ' - ' + selectedSubgroup : '';

    let filteredBooks = (selectedBookgroup!=="") ? Object.values(books).filter(book => book.bookgroup===selectedBookgroup) : books;
    filteredBooks = (selectedSubgroup!=="") ? Object.values(filteredBooks).filter(book => book.subgroup===selectedSubgroup) : filteredBooks;
    const sortedBooks = sortBookList(Object.values(filteredBooks), Object.values(bookgroups));
    
    return (
        <div className="App">
          <AppHeaderH3Plus text={'Bücherliste' + filter} icon='list'/>
          <AddBookModal
            edittype={Edittype.ADD}
            modalOpen={modalOpen}
            onSubmit={handleNewBook}
            error={error}
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
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(sortedBooks).map((book: Book) => (
                <Table.Row key={book.id} onClick={() => handleSelection(book)}>
                  <Table.Cell>{book.title.name}</Table.Cell>
                  <Table.Cell>{book.author.givenname} {book.author.familyname}</Table.Cell>
                  <Table.Cell>{book.bookgroup}</Table.Cell>
                  <Table.Cell>{book.subgroup}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default BookListPage;