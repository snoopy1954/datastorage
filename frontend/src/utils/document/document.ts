import { Document, DocumentNoID } from '../../../../backend/src/types/document';
import { Group } from '../../../../backend/src/types/basic';
import { Filter } from '../../types/document';

export const newDocument = (): DocumentNoID => {
    const document: DocumentNoID = {
        name: "",
        seqnr: 0,
        group: '',
        subgroup: '',
        contents: [],
        keywords: [],
        year: '',
        date: '',
        comment: '',
        person: ''
    };

    return document;
};

export const emptyDocument = (): Document => {
    const document: Document = {
        id: '',
        name: "",
        seqnr: 0,
        group: '',
        subgroup: '',
        contents: [],
        keywords: [],
        year: '',
        date: '',
        comment: '',
        person: ''
    }
    return document;
};

export const nextDocument = (documents: Document[]): DocumentNoID => {
    const document: DocumentNoID = {
        name: "",
        seqnr: nextSeqnr(documents),
        group: '',
        subgroup: '',
        contents: [],
        keywords: [],
        year: '',
        date: '',
        comment: '',
        person: ''
    };

    return document;
};

export const nextSeqnr = (documents: Document[]): number => {
    let maxNumber = 0;

    Object.values(documents).forEach(document => {
        if (document.seqnr >maxNumber) maxNumber = document.seqnr;
    });
    
    return maxNumber+1;
};

const sortElements = (a: Document, b: Document) => {
    const nameA = a.seqnr;
    const nameB = b.seqnr;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

const sortDocuments = (documents: Document[], documentgroups: Group[]) => {
    let documentListSorted: Document[] = [];
    let sortedDocumentgroup;
    let sortedSubgroup;

    documentgroups.forEach(documentgroup => {
        sortedDocumentgroup = [];
        if (documentgroup.subgroups.length===0) {
            sortedDocumentgroup = documents.filter(document => document.group===documentgroup.name);
            documentListSorted = documentListSorted.concat(sortedDocumentgroup.sort(sortElements));
        }
        else {
            documentgroup.subgroups.forEach(subgroup => {
                sortedSubgroup = documents.filter(document => document.subgroup===subgroup);
                documentListSorted = documentListSorted.concat(sortedSubgroup.sort(sortElements));
            });
        }
    });
        
    return documentListSorted;
};

export const documentTitle = (filters: Filter): string => {
    let filter = (filters.group!=="") ? ': ' + filters.group : '';
    filter += (filters.subgroup!=="") ? ' - ' + filters.subgroup : '';

    return filter;
};

export const documentFilter = (documents: Document[], filters: Filter, documentgroups: Group[]): Document[] => {
    let filteredDocuments = (filters.group!=="") ? Object.values(documents).filter(document => document.group===filters.group) : documents;
    filteredDocuments = (filters.subgroup!=="") ? Object.values(filteredDocuments).filter(document => document.subgroup===filters.subgroup) : filteredDocuments;
    filteredDocuments = (filters.year!=="") ? Object.values(filteredDocuments).filter(document => document.year===filters.year) : filteredDocuments;
    filteredDocuments = (filters.person!=="") ? Object.values(filteredDocuments).filter(document => document.person.includes(filters.person)) : filteredDocuments;
    const sortedDocuments = sortDocuments(Object.values(filteredDocuments), Object.values(documentgroups));

    return sortedDocuments;
};

