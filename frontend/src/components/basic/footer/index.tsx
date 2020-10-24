import React from 'react';
import { Container } from "semantic-ui-react";

const AppFooter = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
  
    return (
      <Container textAlign="left" style={footerStyle}>
        Datenbanken app by Snoopy 2020
      </Container>
    )
  }

  export default AppFooter