import React from 'react';

import { AppHeaderH2, AppHeaderH3 } from "../basic/header";


const Movie: React.FC = () => {
    
  return (
    <div className="App">
      <AppHeaderH2 text='Filme' icon='video'/>
      <AppHeaderH3 text='noch nix da'/>
    </div>
  );
}
    
export default Movie;
