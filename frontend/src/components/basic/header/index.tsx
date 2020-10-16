import React from 'react';
import { Icon, Header, Container } from "semantic-ui-react";
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

interface Props {
    text: string;
    icon: SemanticICONS;
}

interface PropsText {
    text: string;
}
    
export const AppHeaderH1 = ({ text, icon }: Props) => {
    return (
      <Container>
        <Header as="h1" style={{ marginLeft: '1em', marginTop: '1em' }}><Icon name={icon} color="teal"></Icon>{text}</Header>
      </Container>
    )
}

export const AppHeaderH2 = ({ text, icon }: Props) => {
    return (
      <Container>
        <Header as="h2" style={{ marginLeft: '2em', marginTop: '1em' }}><Icon name={icon} color="teal"></Icon>{text}</Header>
      </Container>
    )
}

export const AppHeaderH3 = ({ text }: PropsText) => {
    return (
      <Container>
        <Header as="h3" style={{ marginLeft: '4em', marginTop: '1em' }}>{text}</Header>
      </Container>
    )
}

export const AppHeaderH3Plus = ({ text, icon }: Props) => {
  return (
    <Container>
      <Header as="h3" style={{ marginLeft: '4em', marginTop: '1em' }}><Icon name={icon} color="teal"></Icon>{text}</Header>
    </Container>
  )
}