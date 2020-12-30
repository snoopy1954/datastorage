import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from "semantic-ui-react";

import { getOne } from '../../services/image/images';

import { RootState } from '../../state/store';
import { setPdfUrl } from "../../state/axa/pdfUrl/actions";

import { AppHeaderH2 } from "../basic/header";

import { getImageUrl } from "../../utils/image";

import { zukunftID } from "../../constants";


const Home: React.FC = () => {  
  const dispatch = useDispatch();

  const pdfUrl = useSelector((state: RootState) => state.pdfurl);

  React.useEffect(() => {
    const fetchImage = async () => {
      const newImage = await getOne(zukunftID);
      dispatch(setPdfUrl(getImageUrl(newImage)));
    };
    fetchImage();
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeaderH2 text='Bitte Datenbank auswählen' icon='question'/>
      <br></br>
      <Image centered width="800" src={pdfUrl}/>
      <br></br>
    </div>
  );
}

export default Home;