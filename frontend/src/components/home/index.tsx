import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image, Button } from 'semantic-ui-react';
import { styleButton }from '../../constants';
import { zukunftID } from '../../constants';

import { getOneX } from '../../services/binarydata/images';

import { RootState } from '../../state/store';
import { setPdfUrl } from '../../state/axa/pdfUrl/actions';
import { setPage } from '../../state/page/actions';
import { Page } from '../../state/page/types';

import { AppHeaderH2 } from '../basic/header';

import { getImageUrl } from '../../utils/binarydata/binarydata';


const Home: React.FC = () => {  
  const [ showInfo, setShowInfo ] = useState(false); 
  const dispatch = useDispatch();

  const pdfUrl = useSelector((state: RootState) => state.pdfurl);
  const infoPage: Page = { mainpage: 'info', subpage: '' };
 
  useEffect(() => {
    const fetchImage = async () => {
      const image = await getOneX(zukunftID, 'jpg');
      dispatch(setPdfUrl(getImageUrl(image)));
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