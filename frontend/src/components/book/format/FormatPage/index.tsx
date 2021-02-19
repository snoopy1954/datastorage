import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';

import { Format, FormatNoID } from '../../../../../../backend/src/types/book';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addFormat, removeFormat, updateFormat } from '../../../../state/book/formatlist/actions';
import { setSelectedFormat, clearSelectedFormat } from '../../../../state/book/selectedformat/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AskModal } from '../../../basic/askModal';
import { FormatModal } from "../FormatModal";


export const FormatPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const formats = useSelector((state: RootState) => state.formats);      
  const format = useSelector((state: RootState) => state.format);      

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (format: Format): Promise<void> => {
    dispatch(setSelectedFormat(format));
    setModalOpen([false, true, false, false]);
  };
     
  const openModalChange = async (format: Format): Promise<void> => {
    dispatch(setSelectedFormat(format));
    setModalOpen([false, false, true, false]);
  };
 
  const openModalShow = async (format: Format): Promise<void> => {
    dispatch(setSelectedFormat(format));
    setModalOpen([false, false, false, true]);
  };
 
  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
  };
   
  const closeModal = (): void => {
    setModalOpen([false, false, false, false]);
  };

  const actionAdd = async (values: FormatNoID) => {
    dispatch(addFormat(values));
    closeModal();
  };
    
  const actionShow = () => {
    dispatch(clearSelectedFormat());
    closeModal();
  };  
  
  const actionChange = async (values: FormatNoID) => {
    const formatToChange: Format = {
      ...values,
      id: format.id
    };
    dispatch(updateFormat(formatToChange));
    dispatch(clearSelectedFormat());
    closeModal();
  };
  
  const actionDelete = () => {
    dispatch(removeFormat(format.id));
    dispatch(clearSelectedFormat());
    closeModal();
  };  

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '55%' }} className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(formats).map((format: Format) => (
            <Table.Row key={format.id}>
              <Table.Cell style={{ backgroundColor, width: '55%' } } className='left aligned'>{format.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(format)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(format)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(format)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
       </Table.Body>        
    );
  };

  return (
    <div className="App">
      <FormatModal
        edittype={Edittype.ADD}
        title='Neues Format anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <FormatModal
        edittype={Edittype.SHOW}
        title={'Format ' + format.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <FormatModal
        edittype={Edittype.EDIT}
        title={'Format ' + format.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Format löschen'
        prompt={'Format ' + format.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Formate' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      {Object.values(formats).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(formats).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
         </Table>
        </div>
      }
      {Object.values(formats).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
    </div>
  );
};

export default FormatPage;