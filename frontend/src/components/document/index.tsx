import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Group } from '../../../../backend/src/types/basic';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeGroups } from '../../state/groups/actions';
import { initializeDocuments } from '../../state/document/documents/actions';

import { AppHeaderH2 } from '../basic/header';
import { GroupPage } from '../basic/group/GroupPage';
import { DocumentPage } from './document/DocumentPage';

import { getAllDB, createDB, updateDB, removeDB } from '../../utils/document/group';


const Document: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  React.useEffect(() => {
    const fetchGroups = async () => {
      const groups: Group[] = await getAllDB();
      dispatch(initializeGroups(groups));
    }
    fetchGroups();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeDocuments());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'documents' }));
  }, [mainpage, dispatch]);
 
  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }))
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Dokumente' icon='file'/>
      <Button style={styleButton} onClick={() => actionSelect('documents')}>Dokumente</Button>
      <Button style={styleButton} onClick={() => actionSelect('groups')}>Gruppen</Button>
      {subpage==='documents'&&<DocumentPage/>}
      {subpage==='groups'&&<GroupPage title='Dokumentgruppe' createGroupDB={createDB} updateGroupDB={updateDB} removeGroupDB={removeDB}/>}
    </div>
  );
}
    
export default Document;