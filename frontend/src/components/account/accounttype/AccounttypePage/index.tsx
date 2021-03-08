import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Accounttype, AccounttypeNoID } from '../../../../../../backend/src/types/account';

import { RootState } from '../../../../state/store';
import { addAccounttype, updateAccounttype, removeAccounttype } from '../../../../state/account/accounttypes/actions';
import { setSelectedAccounttype, clearSelectedAccounttype } from '../../../../state/account/accounttype/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { AccounttypeModal } from '../AccounttypeModal';

import { getAmount } from '../../../../utils/basic/basic';


export const AccounttypePage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const accounttypes = useSelector((state: RootState) => state.accounttypes);      
  const accounttype = useSelector((state: RootState) => state.accounttype);      

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (account: Accounttype): Promise<void> => {
    dispatch(setSelectedAccounttype(account));
    setModalOpen([false, true, false, false]);
  };
      
  const openModalChange = async (account: Accounttype): Promise<void> => {
    dispatch(setSelectedAccounttype(account));
    setModalOpen([false, false, true, false]);
  };
  
  const openModalShow = async (account: Accounttype): Promise<void> => {
    dispatch(setSelectedAccounttype(account));
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

  const actionAdd = async (values: AccounttypeNoID) => {
    dispatch(addAccounttype(values));
    closeModal();
  };

  const actionShow = () => {
    dispatch(clearSelectedAccounttype());
    closeModal();
  };

  const actionChange = async (values: AccounttypeNoID) => {
    const accounttypeToChange: Accounttype = {
      ...values,
      id: accounttype.id
    };
    console.log(accounttypeToChange)
    dispatch(updateAccounttype(accounttypeToChange));
    dispatch(clearSelectedAccounttype());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeAccounttype(accounttype.id));
    dispatch(clearSelectedAccounttype());
    closeModal();
  };  

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>IBAN</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>BIC</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Kommentar</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Kontostand</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(accounttypes).map((accounttype: Accounttype) => (
            <Table.Row key={accounttype.id}>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='left aligned'>{accounttype.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{accounttype.iban}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{accounttype.bic}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{accounttype.comment}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='right aligned'>{getAmount(accounttype.balance)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(accounttype)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(accounttype)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(accounttype)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
       </Table.Body>        
    );
  };

  
  return (
    <div className="App">
      <AccounttypeModal
        edittype={Edittype.ADD}
        title='Neues Format anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <AccounttypeModal
        edittype={Edittype.SHOW}
        title={'Format ' + accounttype.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <AccounttypeModal
        edittype={Edittype.EDIT}
        title={'Format ' + accounttype.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Format löschen'
        prompt={'Format ' + accounttype.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Kontotypen' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      {Object.values(accounttypes).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(accounttypes).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
         </Table>
        </div>
      }
      {Object.values(accounttypes).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
    </div>
  );
};

export default AccounttypePage;