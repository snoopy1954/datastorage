import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image, Button } from 'semantic-ui-react';
import { styleButton }from '../../constants';
import { zukunftID } from '../../constants';

import { getOne } from '../../services/image/images';

import { RootState } from '../../state/store';
import { setPdfUrl } from '../../state/axa/pdfUrl/actions';
import { setPage } from '../../state/page/actions';
import { Page } from '../../state/page/types';

import { AppHeaderH2 } from '../basic/header';

import { getImageUrl } from '../../utils/image';


const Home: React.FC = () => {  
  const [ showInfo, setShowInfo ] = useState(false); 
  const dispatch = useDispatch();

  const pdfUrl = useSelector((state: RootState) => state.pdfurl);
  const infoPage: Page = { mainpage: 'info', subpage: '' };

  React.useEffect(() => {
    const fetchImage = async () => {
      const newImage = await getOne(zukunftID);
      dispatch(setPdfUrl(getImageUrl(newImage)));
    };
    fetchImage();
  }, [dispatch]);

  return (
    <div className='App'>
      <AppHeaderH2 text='Bitte Datenbank auswählen' icon='question'/>
      <br></br>
      <Image centered width='800' src={pdfUrl} onClick={() => setShowInfo(showInfo ? false : true)}/>
      {showInfo&&<br></br>}
      {showInfo&&<Button type="button" style={styleButton} onClick={() => dispatch(setPage(infoPage))}>Info</Button>}
      <br></br>
    </div>
  );
}

export default Home;