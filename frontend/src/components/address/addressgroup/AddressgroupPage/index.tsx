import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Addressgroup, AddressgroupNoID } from "../../../../../../backend/src/types/address";

import { RootState } from '../../../../state/store';
import { addAddressgroup, updateAddressgroup, removeAddressgroup } from '../../../../state/address/addressgrouplist/actions';
import { setSelectedAddressgroup, clearSelectedAddressgroup } from '../../../../state/address/selectedaddressgroup/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AskModal } from "../../../basic/askModal";
import { AddressgroupModal } from '../AddressgroupModal';


export const AddressgroupPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
    const dispatch = useDispatch();

    const addressgroups: Addressgroup[] = useSelector((state: RootState) => state.addressgroups);      
    const addressgroup: Addressgroup = useSelector((state: RootState) => state.addressgroup);      

    const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
    const openModalDelete = (group: Addressgroup): void => {
      dispatch(setSelectedAddressgroup(group));
      setModalOpen([false, true, false, false]);
    };
    
    const openModalChange = (group: Addressgroup): void => {
      dispatch(setSelectedAddressgroup(group));
      setModalOpen([false, false, true, false]);
    };
    
    const openModalShow = (group: Addressgroup): void => {
      dispatch(setSelectedAddressgroup(group));
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

    const actionShow = () => {
      dispatch(clearSelectedAddressgroup());
      closeModal();
    };  

    const actionAdd = async (values: AddressgroupNoID) => {
      const addressgroupToAdd: AddressgroupNoID = {
        ...values
      }
      dispatch(addAddressgroup(addressgroupToAdd));
      dispatch(clearSelectedAddressgroup());
      closeModal();
    };

    const actionChange = async (values: AddressgroupNoID) => {
      const addressgroupToChange: Addressgroup = {
        ...values,
        id: addressgroup.id
      }
      dispatch(updateAddressgroup(addressgroupToChange));
      dispatch(clearSelectedAddressgroup());
      closeModal();
    };

    const actionDelete = () => {
      dispatch(removeAddressgroup(addressgroup.id));
      dispatch(clearSelectedAddressgroup());
      closeModal();
    };  

    return (
        <div className="App">
          <AddressgroupModal
            edittype={Edittype.ADD}
            title='Neue Gruppe anlegen'
            modalOpen={modalOpen[ModalDialog.NEW]}
            onSubmit={actionAdd}
            onClose={closeModal}
          />
          <AddressgroupModal
            edittype={Edittype.SHOW}
            title={'Gruppe ' + addressgroup.groupname.name + ' anzeigen'}
            modalOpen={modalOpen[ModalDialog.SHOW]}
            onSubmit={actionShow}
            onClose={closeModal}
          />
          <AddressgroupModal
            edittype={Edittype.EDIT}
            title={'Gruppe ' + addressgroup.groupname.name + ' ändern'}
            modalOpen={modalOpen[ModalDialog.CHANGE]}
            onSubmit={actionChange}
            onClose={closeModal}
          />
          <AskModal
            header='Gruppe löschen'
            prompt={'Gruppe ' + addressgroup.groupname.name + ' löschen?'}
            modalOpen={modalOpen[ModalDialog.DELETE]}
            onSubmit={actionDelete}
            onClose={closeModal}
          />
          <AppHeaderH3 text='Gruppen' icon='list'/>
          <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Name</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor }} className='six wide center aligned'>Kommentar</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor }} className='seven wide center aligned'>Aktion</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(addressgroups).map((addressgroup: Addressgroup) => (
                <Table.Row key={addressgroup.id}>
                  <Table.Cell>{addressgroup.groupname.name}</Table.Cell>
                  <Table.Cell>{addressgroup.comment}</Table.Cell>
                  <Table.Cell>
                    <Button style={styleButton} onClick={() => openModalShow(addressgroup)}>Anzeigen</Button>
                    <Button style={styleButton} onClick={() => openModalChange(addressgroup)}>Ändern</Button>
                    <Button style={styleButton} onClick={() => openModalDelete(addressgroup)}>Löschen</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default AddressgroupPage;