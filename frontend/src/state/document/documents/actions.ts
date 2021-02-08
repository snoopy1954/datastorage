import { Document, DocumentNoID } from '../../../../../backend/src/types/document';
import { 
    SET_DOCUMENTS, 
    ADD_DOCUMENT,
    UPDATE_DOCUMENT,
    REMOVE_DOCUMENT,
    EXCHANGE_DOCUMENTS,
    DispatchSetDocuments,
    DispatchAddDocument,
    DispatchUpdateDocument,
    DispatchRemoveDocument
} from './types';

import { create, update, remove, getAll } from "../../../services/document/documents";


export const initializeDocuments = () => {
  return async (dispatch: DispatchSetDocuments) => {
    const documents = await getAll();
    dispatch({
      type: SET_DOCUMENTS,
      payload: documents,
    });
  }
};

export const addDocument = (document: DocumentNoID) => {
  return async (dispatch: DispatchAddDocument) => {
    const newDocument = await create(document);
    dispatch({
      type: ADD_DOCUMENT,
      payload: newDocument
    });
  }
};

export const updateDocument = (document: Document) => {
  return async (dispatch: DispatchUpdateDocument) => {
    const newDocument = await update(document.id, document);
    dispatch({
      type: UPDATE_DOCUMENT,
      payload: newDocument
    });
  }
};
  
export const removeDocument = (id: string) => {
  return async (dispatch: DispatchRemoveDocument) => {
    await remove(id);
    dispatch({
      type: REMOVE_DOCUMENT,
      payload: id
    });
  }
};

export const exchangeDocuments = (documents: Document[]) => {
  const action = 
    {
      type: EXCHANGE_DOCUMENTS,
      payload: documents,
    }
        
    return action;  
};

