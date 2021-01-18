import React from 'react';
import { Container } from 'semantic-ui-react';

export const AppFooter = () => {
  const footerStyle = {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 16
  };
  
      
  return (
    <Container textAlign='left' style={footerStyle} fluid>
      <div>
        <p>Datenbanken 2.03 (18.01.2021) by Snoopy 2020-2021</p>
      </div>
    </Container>
  );
};

export default AppFooter