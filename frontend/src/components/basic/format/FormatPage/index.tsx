import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Format, FormatNoID } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';
import { addFormat, updateFormat, removeFormat } from '../../../../state/basic/formats/actions';

import { AppHeaderH3 } from '../../header';
import { AskModal } from "../../askModal";
import { FormatModal } from '../FormatModal';

import { emptyFormat } from '../../../../utils/basic/format';


interface Props {
  title: string;
  createFormatDB: (format: FormatNoID) => Promise<Format>;
  updateFormatDB: (format: Format) => Promise<Format>;
  removeFormatDB: (id: string) => Promise<void>;
};

export const FormatPage: React.FC<Props> = ({ title, createFormatDB, updateFormatDB, removeFormatDB }: Props) => {
  const [format, setFormat] = useState<Format>(emptyFormat());
  const [modalOpen, setModalOpen] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const formats: Format[] = useSelector((state: RootState) => state.formats);

  const dispatch = useDispatch();

  const openModalNew = (): void => {
    setModalOpen([true, false, false, false]);
  };
  
  const openModalDelete = (format: Format): void => {
    setFormat(format);
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (format: Format): void => {
    setFormat(format);
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (format: Format): void => {
    setFormat(format);
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
    const format: Format = await createFormatDB(values);
    dispatch(addFormat(format));
    closeModal();
  };
          
  const actionShow = () => {
    setFormat(emptyFormat());
    closeModal();
  };  
  
  const actionChange = async (values: FormatNoID) => {
    const formatToChange: Format = {
      ...values,
      id: format.id
    };
    const formatChanged: Format = await updateFormatDB(formatToChange);
    dispatch(updateFormat(formatChanged));
    setFormat(emptyFormat());
    closeModal();
  };
  
  const actionDelete = async () => {
    await removeFormatDB(format.id);
    dispatch(removeFormat(format.id));
    setFormat(emptyFormat());
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
        title='Gruppe anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        format={format}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <FormatModal
        edittype={Edittype.SHOW}
        title={`${title} '${format.name}' anzeigen`}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        format={format}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <FormatModal
        edittype={Edittype.EDIT}
        title={`${title} '${format.name}' ändern`}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        format={format}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header={`${title} löschen`}
        prompt={`${title} '${format.name}' löschen`}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={`${title}`} icon='list'/>
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
}

export default FormatPage;