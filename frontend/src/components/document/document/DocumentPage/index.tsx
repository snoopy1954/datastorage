import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton, styleButtonSmall } from '../../../../constants';

import { Group } from '../../../../../../backend/src/types/basic';
import { Content2 } from '../../../../../../backend/src/types/basic';
import { Document, DocumentNoID } from '../../../../../../backend/src/types/document';
import { Filter, DocumentWithContentsNoID } from '../../../../types/document';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { setDocumentfilter, clearDocumentfilter } from '../../../../state/document/filter/actions';
import { addDocument, updateDocument, exchangeDocuments, removeDocument } from '../../../../state/document/documents/actions';
import { setSelectedDocument, clearSelectedDocument } from '../../../../state/document/document/actions';
import { addChangedDocument, clearChangedDocument } from '../../../../state/document/changed/actions';
import { clearPdfUrl } from '../../../../state/axa/pdfUrl/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskString, Value } from '../../../basic/askString';
import { AskModal } from '../../../basic/askModal';
import { DocumentModal } from '../DocumentModal';

import { documentTitle, documentFilter } from '../../../../utils/document/document';
import { createContent, removeContent } from '../../../../utils/basic/content';


export const DocumentPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false]);
  const dispatch = useDispatch();

  const documentgroups: Group[] = useSelector((state: RootState) => state.documentgroups);      
  const filters: Filter = useSelector((state: RootState) => state.documentfilter);
  const documents: Document[] = useSelector((state: RootState) => state.documents);
  const document: Document = useSelector((state: RootState) => state.document);
  const changedDocuments: Document[] = useSelector((state: RootState) => state.changeddocuments);

  React.useEffect(() => {
    dispatch(clearSelectedDocument());
    dispatch(clearDocumentfilter());
  }, [dispatch]);  
  
  const openModalNew = (): void => setModalOpen([true, false, false, false, false]);

  const openModalDelete = (document: Document): void => {
    dispatch(setSelectedDocument(document));
    setModalOpen([false, true, false, false, false]);
  };
      
  const openModalChange = (document: Document): void => {
    dispatch(setSelectedDocument(document));
    setModalOpen([false, false, true, false, false]);
  };
      
  const openModalShow = (document: Document): void => {
    dispatch(setSelectedDocument(document));
    dispatch(clearPdfUrl());
    setModalOpen([false, false, false, true, false]);
  };
  
  const openModalFind = (): void => setModalOpen([false, false, false, false, true]);

  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
    FIND = 4,
  };

  const closeModal = (): void => {
      setModalOpen([false, false, false, false, false]);
  };

  const actionSelectionClick = (filter: string, selection: string) => {
    switch (filter) {
      case 'Gruppe':
        dispatch(setDocumentfilter({
          ...filters, 
          group: selection,
          subgroup: ''
        }));
        break;
      case 'Untergruppe':
        dispatch(setDocumentfilter({
          ...filters, 
          subgroup: selection
        }));
        break;
      default:
    }
  };

  const actionSelectedName = (name: Value) => {
    dispatch(setDocumentfilter({ 
      ...filters, 
      person: name.value }));
    closeModal();
  };

  const actionAdd = async (values: DocumentWithContentsNoID) => {
    const documentToAdd: DocumentNoID = {
      ...values,
    };
    await Promise.all(values.contentswithfile.map(async contentwithfile => {
      if (contentwithfile.dataId==='') {
        const content: Content2 = await createContent(contentwithfile);
        documentToAdd.contents.push(content);
      }
    }));
    dispatch(addDocument(documentToAdd));
    closeModal();
  };

  const actionChange = async (values: DocumentWithContentsNoID) => {
    const documentToChange: Document = {
      ...values,
      id: document.id,
    };
    documentToChange.contents.forEach((content, index) => {
      let found = false;
      values.contentswithfile.forEach(contentwithfile => {
        if (content.dataId===contentwithfile.dataId) found = true;
      });
      if (!found) {
        removeContent(content.dataId);
        documentToChange.contents.splice(index, 1);
      }
    });
    await Promise.all(values.contentswithfile.map(async contentwithfile => {
      if (contentwithfile.dataId==='') {
        const content: Content2 = await createContent(contentwithfile);
        documentToChange.contents.push(content);
      }
    }));
    dispatch(updateDocument(documentToChange));
    dispatch(clearSelectedDocument());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeDocument(document.id));
    dispatch(clearSelectedDocument());
    closeModal();
  };  

  const actionShow = () => {
    dispatch(clearSelectedDocument());
    closeModal();
  };

  const actionUpDown = (direction: string, index: number, list: Document[]) => {
    if ((direction===Direction.UP && index===0) || (direction===Direction.DOWN && index===list.length-1)) return;
      
    const document1: Document = list[index]; 
    const document2: Document = direction===Direction.UP ? list[index-1] : list[index+1];
    const seqnr1 = document1.seqnr;
    const seqnr2 = document2.seqnr;
    document1.seqnr = seqnr2;
    document2.seqnr = seqnr1;
    const documentsToChange: Document[] = [document1, document2];
    dispatch(exchangeDocuments(documentsToChange));
    dispatch(addChangedDocument(document1));
    dispatch(addChangedDocument(document2));
  };

  const actionSaveSequence = () => {
    Object.values(changedDocuments).forEach(changedDocument => {
      dispatch(updateDocument(changedDocument));
    });
    dispatch(clearChangedDocument());
  };

  const documentgroupOptions: string[] = [];
  Object.values(documentgroups).forEach(element => {
    documentgroupOptions.push(element.name)
  });

  const getDocumentgroup = (documentgroupName: string): Group | undefined => {
    const documentgroup = Object.values(documentgroups).filter(documentgroup => documentgroup.name===documentgroupName);
    return documentgroup.length > 0 ? documentgroup[0] : undefined;
  };

  const subgroupOptions: string[] = [];
  const documentgroup = getDocumentgroup(filters.group);
  if (documentgroup) {
    documentgroup.subgroups.forEach(element => {
      subgroupOptions.push(element);
    });
  };

  const filterSelected = (filters.group!=='' && filters.subgroup!=='') || (filters.group!=='' && getDocumentgroup(filters.group)?.subgroups.length===0);
  const sequenceChanged = (Object.values(changedDocuments).length > 0);
  const title = 'Dokumentliste' + documentTitle(filters);
  const sortedDocuments = documentFilter(documents, filters, documentgroups);

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '35%' }} className='center aligned'>Dokumenttitel</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Gruppe</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Auf/Ab</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(sortedDocuments).map((document: Document, index: number) => (
            <Table.Row key={document.id}>
              <Table.Cell style={{ backgroundColor, width: '35%' } } className='left aligned'>{document.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{document.group}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='center aligned'>
                <Button className="ui icon button" style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.UP, index, sortedDocuments) }>
                  <i className="angle up icon"></i>
                </Button>
                <Button className="ui icon button" style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.DOWN, index, sortedDocuments) }>
                  <i className="angle down icon"></i>
                </Button>
              </Table.Cell>
                <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(document)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(document)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(document)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
  };

  return (
    <div className='App'>
      <DocumentModal
        edittype={Edittype.ADD}
        title='Neues Dokument anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <DocumentModal
        edittype={Edittype.SHOW}
        title={'Dokument ' + document.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <DocumentModal
        edittype={Edittype.EDIT}
        title={'Dokument ' + document.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Dokument löschen'
        prompt={'Dokument ' + document.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AskString
        header='Dokumentname eingeben'
        prompt='Dokumentname eingeben'
        modalOpen={modalOpen[ModalDialog.FIND]}
        onSubmit={actionSelectedName}
        onClose={closeModal}
      />
      <AppHeaderH3 text={title} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as='select' className='ui dropdown' style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Gruppe', event.currentTarget.value)}>
        <option value='' style={styleButton}>Gruppe</option>
        {documentgroupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as='select' className='ui dropdown' style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Untergruppe', event.currentTarget.value)}>
        <option value='' style={styleButton}>U.Gruppe</option>
        {subgroupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button style={styleButton} onClick={() => openModalFind()}>Name</Button>
      <Button style={styleButton} disabled={!sequenceChanged} onClick={() => actionSaveSequence()}>Speichern</Button>
      {/* <Table celled style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }} className='five wide center aligned'>Dokumenttitel</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='two wide center aligned'>Gruppe</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='two wide center aligned'>Auf/Ab</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='four wide center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(sortedDocuments).map((document: Document, index: number) => (
            <Table.Row key={document.id}>
              <Table.Cell>{document.name}</Table.Cell>
              <Table.Cell>{document.group}</Table.Cell>
              <Table.Cell>
                <Button className='ui icon button' style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.UP, index, sortedDocuments) }>
                  <i className='angle up icon'></i>
                </Button>
                <Button className='ui icon button' style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.DOWN, index, sortedDocuments) }>
                  <i className='angle down icon'></i>
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(document)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(document)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(document)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table> */}
      {sortedDocuments.length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
          <ShowTableHeader/>
          <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default DocumentPage;