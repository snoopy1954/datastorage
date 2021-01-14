import React from 'react';
import { Icon, Header, Container } from "semantic-ui-react";
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

interface Props {
  text: string;
  icon: SemanticICONS;
};
    
export const AppHeaderH1 = ({ text, icon }: Props) => {
  return (
    <Container fluid>
      <Header as="h1" style={{ marginLeft: '1em', marginTop: '10px', marginBottom: '10px' }}><Icon name={icon} color="teal"></Icon>{text}</Header>
    </Container>
  )
};

export const AppHeaderH2 = ({ text, icon }: Props) => {
  return (
    <Container fluid>
      <Header as="h2" style={{ marginLeft: '2em', marginTop: '20px', marginBottom: '10px' }}><Icon name={icon} color="teal"></Icon>{text}</Header>
    </Container>
  )
};

export const AppHeaderH3 = ({ text, icon }: Props) => {
  return (
    <Container fluid>
      <Header as="h3" style={{ marginLeft: '4em', marginTop: '20px', marginBottom: '10px' }}><Icon name={icon} color="teal"></Icon>{text}</Header>
    </Container>
  )
};