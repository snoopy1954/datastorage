import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { RootState } from '../../../state/store';


export const AppFooter = () => {
  const infos = useSelector((state: RootState) => state.infos);

  const footerText: string = `Datenbanken ${infos.version} (${infos.date}) by Snoopy 2020-2021`;

  const footerStyle = {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 16
  };
  
      
  return (
    <Container textAlign='left' style={footerStyle} fluid>
      <div>
        <p>{footerText}</p>
      </div>
    </Container>
  );
};

export default AppFooter