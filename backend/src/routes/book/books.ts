/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Book from '../../models/book/book';
import { toNewBook } from '../../utils/book/parameters';

const booksRouter = express.Router();

booksRouter.get('/', async (_request, response) => {
    const books = await Book.find({});
  
    response.json(books.map(book => book.toJSON()));
});

booksRouter.get('/:id', async (request, response) => {
    try {
        const book = await Book.findById(request.params.id);
        if (book) response.json(book.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

booksRouter.post('/', async (request, response) => {
    try {
        const newBook = new Book(toNewBook(request.body));
        void await newBook.save();
        response.json(newBook);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

booksRouter.delete('/:id', async (request, response) => {
    try {
        const book = await Book.findByIdAndRemove(request.params.id);
        if (book) response.json(book.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
booksRouter.put('/:id', async (request, response) => {
    try {
        const newBook = toNewBook(request.body); 
        const book = await Book.findByIdAndUpdate(request.params.id, newBook, { new: true });
        if (book) response.json(book.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default booksRouter;