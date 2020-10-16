import React from 'react';

import { AppHeaderH2, AppHeaderH3 } from "../basic/header";


const Address: React.FC = () => {
    
  return (
    <div className="App">
      <AppHeaderH2 text='Adressen' icon='address book'/>
      <AppHeaderH3 text='noch nix da'/>
    </div>
  );
}
    
export default Address;
