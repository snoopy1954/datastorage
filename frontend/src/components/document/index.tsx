import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeDocumentgroups } from '../../state/document/groups/actions';
import { initializeDocuments } from '../../state/document/documents/actions';

import { AppHeaderH2 } from '../basic/header';
import { GroupPage } from './group/GroupPage';
import { DocumentPage } from './document/DocumentPage';


const Document: React.FC = () => {  
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  React.useEffect(() => {
    dispatch(initializeDocumentgroups());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeDocuments());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'document' }));
  }, [mainpage, dispatch]);
 
  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }))
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Dokumente' icon='file'/>
      <Button style={styleButton} onClick={() => actionSelect('document')}>Dokumente</Button>
      <Button style={styleButton} onClick={() => actionSelect('group')}>Gruppen</Button>
      {subpage==='group'&&<GroupPage/>}
      {subpage==='document'&&<DocumentPage/>}
    </div>
  );
}
    
export default Document;