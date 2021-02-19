import React from 'react'

import { AppHeaderH2, AppHeaderH3 } from '../basic/header';


const Music: React.FC = () => {  
  return (
    <div className='App'>
      <AppHeaderH2 text='Musik...' icon='music'/>
      <AppHeaderH3 text='... ist noch nicht implementiert' icon='exclamation'/>
    </div>
  );
}

export default Music;