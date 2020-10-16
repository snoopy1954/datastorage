import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Book, BookNoID } from "../../types/book";


const getAll = async () => {
    const { data: books } = await axios.get<Book[]>(
        `${apiBaseUrl}/books`
    );

    return books;
}

const getOne = async (id: string) => {
    const { data: book } = await axios.get<Book>(
        `${apiBaseUrl}/books/${id}`
    );

    return book;
}

const create = async (book: BookNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/books`,
        book
    );

    return response.data
}

const update = async (id: string, book: BookNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/books/${id}`, 
        book
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/books/${id}`
    );

    return response.data
}



export { getAll, getOne, create, update, remove }
