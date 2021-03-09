import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Image, Button } from 'semantic-ui-react';
import { styleButton }from '../../constants';
import { zukunftID } from '../../constants';

import { setPage } from '../../state/page/actions';
import { Page } from '../../state/page/types';

import { AppHeaderH2 } from '../basic/header';

import { getOneBinarydata } from '../../utils/basic/content'
import { getImageUrl } from '../../utils/basic/binarydata';


const Home: React.FC = () => {  
  const [url, setUrl] = React.useState('');
  const [ showInfo, setShowInfo ] = useState(false); 
  const dispatch = useDispatch();

  const infoPage: Page = { mainpage: 'info', subpage: '' };
 
  useEffect(() => {
    const fetchImage = async () => {
      const image = await getOneBinarydata(zukunftID, 'jpg');
      setUrl(getImageUrl(image));
    };
    fetchImage();
  }, []);

  return (
    <div className='App'>
      <AppHeaderH2 text='Bitte Datenbank auswählen' icon='question'/>
      <br></br>
      <Image centered width='800' src={url} onClick={() => setShowInfo(showInfo ? false : true)}/>
      {showInfo&&<br></br>}
      {showInfo&&<Button type="button" style={styleButton} onClick={() => dispatch(setPage(infoPage))}>Info</Button>}
      <br></br>
    </div>
  );
}

export default Home;