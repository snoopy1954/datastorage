import { Book, Bookgroup } from '../types/book';

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

export const sortBookList = (books: Book[], bookgroups: Bookgroup[]) => {
    let bookListSorted: Book[] = [];
    let sortedBookgroup;
    let sortedSubgroup;

    bookgroups.forEach(bookgroup => {
        sortedBookgroup = [];
        if (bookgroup.subgroups===[]) {
            sortedBookgroup = books.filter(book => book.bookgroup===bookgroup.groupname.name);
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
}
