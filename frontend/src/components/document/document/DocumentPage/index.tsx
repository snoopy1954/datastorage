import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton, styleButtonSmall } from '../../../../constants';

import { Group, Content2 } from '../../../../../../backend/src/types/basic';
import { Document, DocumentNoID } from '../../../../../../backend/src/types/document';
import { Filter, DocumentWithContentsNoID } from '../../../../types/document';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addDocument, updateDocument, exchangeDocuments, removeDocument } from '../../../../state/document/documents/actions';
import { setSelectedDocument, clearSelectedDocument } from '../../../../state/document/document/actions';
import { clearPdfUrl } from '../../../../state/axa/pdfUrl/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskString, Value } from '../../../basic/askString';
import { AskModal } from '../../../basic/askModal';
import { DocumentModal } from '../DocumentModal';

import { documentTitle, documentFilter, newFilter } from '../../../../utils/document/document';
import { createContent, removeContent } from '../../../../utils/basic/content';


export const DocumentPage: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(newFilter());
  const [documentsChanged, setDocumentsChanged] = useState<Array<Document>>([]);
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false]);

  const dispatch = useDispatch();

  const groups: Group[] = useSelector((state: RootState) => state.documentgroups); 
  const documents: Document[] = useSelector((state: RootState) => state.documents);
  const document: Document = useSelector((state: RootState) => state.document);

  useEffect(() => {
    dispatch(clearSelectedDocument());
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

  const actionSelectionClick = (type: string, selection: string) => {
    switch (type) {
      case 'Gruppe':
        setFilter({
          ...filter, 
          group: selection,
          subgroup: ''
        });
        break;
      case 'Untergruppe':
        setFilter({
          ...filter, 
          subgroup: selection
        });
        break;
      default:
    }
  };

  const actionSelectedName = (name: Value) => {
    setFilter({ 
      ...filter, 
      person: name.value
    });
    closeModal();
  };

  const actionAdd = async (values: DocumentWithContentsNoID) => {
    const documentToAdd: DocumentNoID = {
      ...values,
    };
    await Promise.all(values.contentswithfile.map(async contentwithfile => {
      if (contentwithfile.dataId==='') {
        const content: Content2 = await createContent(contentwithfile, 'pdf');
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
        removeContent(content.dataId, 'pdf');
        documentToChange.contents.splice(index, 1);
      }
    });
    await Promise.all(values.contentswithfile.map(async contentwithfile => {
      if (contentwithfile.dataId==='') {
        const content: Content2 = await createContent(contentwithfile, 'pdf');
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
    setDocumentsChanged(arr => [...arr, document1]);
    setDocumentsChanged(arr => [...arr, document2]);
  };

  const actionSaveSequence = () => {
    Object.values(documentsChanged).forEach(documentChanged => {
      dispatch(updateDocument(documentChanged));
    });
    setDocumentsChanged([]);
  };

  const documentgroupOptions: string[] = [];
  Object.values(groups).forEach(element => {
    documentgroupOptions.push(element.name)
  });

  const getDocumentgroup = (groupName: string): Group | undefined => {
    const group = Object.values(groups).filter(group => group.name===groupName);
    return group.length > 0 ? group[0] : undefined;
  };

  const subgroupOptions: string[] = [];
  const group = getDocumentgroup(filter.group);
  if (group) {
    group.subgroups.forEach(element => {
      subgroupOptions.push(element);
    });
  };

  const filterSelected = (filter.group!=='' && filter.subgroup!=='') || (filter.group!=='' && getDocumentgroup(filter.group)?.subgroups.length===0);
  const sequenceChanged = (Object.values(documentsChanged).length > 0);
  const title = 'Dokumentliste' + documentTitle(filter);
  const sortedDocuments = documentFilter(documents, filter, groups);

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