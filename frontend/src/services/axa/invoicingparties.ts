import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { InvoicingParty, InvoicingPartyNoID } from '../../../../backend/src/types/axa';

const getAll = async () => {
    const { data: invoicingparties } = await axios.get<InvoicingParty[]>(
        `${apiBaseUrl}/invoicingparties`
    );

    return invoicingparties;
}

const getOne = async (id: string) => {
    const { data: invoicingparty } = await axios.get<InvoicingParty>(
        `${apiBaseUrl}/invoicingparties/${id}`
    );

    return invoicingparty;
}

const create = async (invoicingparty: InvoicingPartyNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/invoicingparties`,
        invoicingparty
    );

    return response.data
}

const update = async (id: string, invoicingparty: InvoicingPartyNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/invoicingparties/${id}`, 
        invoicingparty
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/invoicingparties/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
