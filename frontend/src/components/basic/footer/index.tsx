import React from 'react';
import { Container } from "semantic-ui-react";

export const AppFooter = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
  
    return (
      <Container textAlign="left" style={footerStyle} fluid>
        Datenbanken V2.0 (14.01.2021) by Snoopy 2020-2021
      </Container>
    )
}

export default AppFooter