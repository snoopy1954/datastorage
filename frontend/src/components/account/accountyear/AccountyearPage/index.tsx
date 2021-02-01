import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Accountyear, AccountyearNoID } from '../../../../../../backend/src/types/account';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addAccountyear, removeAccountyear, updateAccountyear } from  '../../../../state/account/accountyears/actions';
import { clearSelectedAccountyear, setSelectedAccountyear } from '../../../../state/account/accountyear/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { AccountyearModal } from '../AccountyearModal';


export const AccountyearPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
    const dispatch = useDispatch();

    const years: Accountyear[] = useSelector((state: RootState) => state.accountyears);
    const year: Accountyear = useSelector((state: RootState) => state.accountyear);

    const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
    const openModalDelete = (year: Accountyear): void => {
        dispatch(setSelectedAccountyear(year));
        setModalOpen([false, true, false, false]);
    };
    
    const openModalChange = (year: Accountyear): void => {
        dispatch(setSelectedAccountyear(year));
        setModalOpen([false, false, true, false]);
    };
    
    const openModalShow = (year: Accountyear): void => {
        dispatch(setSelectedAccountyear(year));
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

    const actionAdd = async (values: AccountyearNoID) => {
      dispatch(addAccountyear(values));
      closeModal();
    };

    const actionChange = async (values: AccountyearNoID) => {
      const yearToChange: Accountyear = {
        ...values,
        id: year.id
      };
      dispatch(updateAccountyear(yearToChange));
      dispatch(clearSelectedAccountyear());
      closeModal();
    };

    const actionDelete = () => {
      dispatch(removeAccountyear(year.id));
      dispatch(clearSelectedAccountyear());
      closeModal();
    };  

    const actionShow = () => {
      dispatch(clearSelectedAccountyear());
      closeModal();
    };  
      
    return (
        <div className="App">
          <AccountyearModal
            edittype={Edittype.ADD}
            title='Neues Jahr anlegen'            
            modalOpen={modalOpen[ModalDialog.NEW]}
            onSubmit={actionAdd}
            onClose={closeModal}
          />
          <AccountyearModal
            edittype={Edittype.SHOW}
            title={'Jahr ' + year.name + ' anzeigen'}
            modalOpen={modalOpen[ModalDialog.SHOW]}
            onSubmit={actionShow}
            onClose={closeModal}
          />
          <AccountyearModal
            edittype={Edittype.EDIT}
            title={'Jahr ' + year.name + ' ändern'}
            modalOpen={modalOpen[ModalDialog.CHANGE]}
            onSubmit={actionChange}
            onClose={closeModal}
          />
          <AskModal
            header='Jahr löschen'
            prompt={'Jahr ' + year.name + ' löschen?'}
            modalOpen={modalOpen[ModalDialog.DELETE]}
            onSubmit={actionDelete}
            onClose={closeModal}
          />
          <AppHeaderH3 text='Jahre' icon='list'/>
          <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ backgroundColor }} className='eight wide center aligned'>Jahr</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Aktion</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(years).map((year: Accountyear) => (
                <Table.Row key={year.id}>
                  <Table.Cell>{year.name}</Table.Cell>
                  <Table.Cell>
                    <Button style={styleButton} onClick={() => openModalShow(year)}>Anzeigen</Button>
                    <Button style={styleButton} onClick={() => openModalChange(year)}>Ändern</Button>
                    <Button style={styleButton} onClick={() => openModalDelete(year)}>Löschen</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default AccountyearPage;