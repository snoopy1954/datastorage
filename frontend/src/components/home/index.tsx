import React from 'react';

import { AppHeaderH2 } from "../basic/header";


const Home: React.FC = () => {  return (
    <div className="App">
      <AppHeaderH2 text='Bitte Datenbank auswählen' icon='question'/>
    </div>
  );
}

export default Home;