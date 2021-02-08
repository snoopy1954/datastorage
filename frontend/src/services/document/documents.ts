import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Document, DocumentNoID } from '../../../../backend/src/types/document';

const getAll = async () => {
    const { data: documents } = await axios.get<Document[]>(
        `${apiBaseUrl}/documents`
    );

    return documents;
}

const getOne = async (id: string) => {
    const { data: document } = await axios.get<Document>(
        `${apiBaseUrl}/documents/${id}`
    );

    return document;
}

const create = async (document: DocumentNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/documents`,
        document
    );

    return response.data
}

const update = async (id: string, document: DocumentNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/documents/${id}`, 
        document
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/documents/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
