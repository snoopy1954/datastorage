import { Group } from '../../../../backend/src/types/basic';
import { Book, BookNoID } from '../../../../backend/src/types/book';
import { Filter } from '../../types/book';

const sortBooks = (a: Book, b: Book) => {
    const nameA = a.title.seqnr;
    const nameB = b.title.seqnr;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

const sortBookList = (books: Book[], bookgroups: Group[]) => {
    let bookListSorted: Book[] = [];
    let sortedBookgroup;
    let sortedSubgroup;

    bookgroups.forEach(bookgroup => {
        sortedBookgroup = [];
        if (bookgroup.subgroups.length===0) {
            sortedBookgroup = books.filter(book => book.bookgroup===bookgroup.name);
            bookListSorted = bookListSorted.concat(sortedBookgroup.sort(sortBooks));
        }
        else {
            bookgroup.subgroups.forEach(subgroup => {
                sortedSubgroup = books.filter(book => book.subgroup===subgroup);
                bookListSorted = bookListSorted.concat(sortedSubgroup.sort(sortBooks));
            });
        }
    });
        
    return bookListSorted;
};

export const newBook = (): BookNoID => {
    const book = {
    title: {
        name: "",
        seqnr: 0
      },
      author: {
        givenname: "",
        familyname: ""
      },
      comment: "",
      link: "",
      launched: "",
      read: "",
      createdAt: new Date(),
      modifiedAt: new Date(),
      bookgroup: "",
      subgroup: "",
      ownership: "",
      format: "",
      tongue: "",
      content: {
        filename: "",
        filetype: "",
        filesize: "",
        dataId: "",
        date: '',
        description: '',
        seqnr: 0
      },
    };

    return book;
};

export const emptyBook = (): Book => {
    const book = {
      id: '',
      title: {
        name: "",
        seqnr: 0
      },
      author: {
        givenname: "",
        familyname: ""
      },
      comment: "",
      link: "",
      launched: "",
      read: "",
      createdAt: new Date(),
      modifiedAt: new Date(),
      bookgroup: "",
      subgroup: "",
      ownership: "",
      format: "",
      tongue: "",
      content: {
        filename: "",
        filetype: "",
        filesize: "",
        dataId: "",
        date: '',
        description: '',
        seqnr: 0
      },
    };

    return book;
};

export const nextBook = (books: Book[]): BookNoID => {
    const book = {
        id: '',
        title: {
          name: "",
          seqnr: nextSeqnr(books),
        },
        author: {
          givenname: "",
          familyname: ""
        },
        comment: "",
        link: "",
        launched: "",
        read: "",
        createdAt: new Date(),
        modifiedAt: new Date(),
        bookgroup: "",
        subgroup: "",
        ownership: "",
        format: "",
        tongue: "",
        content: {
          filename: "",
          filetype: "",
          filesize: "",
          dataId: "",
          date: '',
          description: '',
          seqnr: 0
        },
      };
  
      return book;
  }

export const booklistTitle = (filters: Filter): string => {
    let filter = (filters.group!=="") ? ': ' + filters.group : '';
    filter += (filters.subgroup!=="") ? ' - ' + filters.subgroup : '';
    filter += (filters.tongue!=="") ? ' - ' + filters.tongue : '';

    return filter;
};

export const booklistFilter = (books: Book[], filters: Filter, bookgroups: Group[]): Book[] => {
    let filteredBooks = (filters.group!=="") ? Object.values(books).filter(book => book.bookgroup===filters.group) : books;
    filteredBooks = (filters.subgroup!=="") ? Object.values(filteredBooks).filter(book => book.subgroup===filters.subgroup) : filteredBooks;
    filteredBooks = (filters.tongue!=="") ? Object.values(filteredBooks).filter(book => book.tongue===filters.tongue) : filteredBooks;
    filteredBooks = (filters.author!=="") ? Object.values(filteredBooks).filter(book => book.author.familyname.includes(filters.author)) : filteredBooks;
    const sortedBooks = sortBookList(Object.values(filteredBooks), Object.values(bookgroups));

    return sortedBooks;
};

export const nextSeqnr = (books: Book[]): number => {
    let maxNumber = 0;
    Object.values(books).forEach(book => {
        if (book.title.seqnr>maxNumber) maxNumber = book.title.seqnr;
    });
    
    return maxNumber+1;
};

export const newFilter = (): Filter => {
    const filter: Filter = {
        group: '',
        subgroup: '',
        tongue: '',
        author: ''
    }

    return filter;
};
