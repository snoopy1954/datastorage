import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';

import { Group, Year } from '../../../../../../backend/src/types/basic';
import { Activity, ActivityNoID } from '../../../../../../backend/src/types/sport';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addActivity, updateActivity, removeActivity } from '../../../../state/sport/activities/actions';
import { setSelectedActivity, clearSelectedActivity } from '../../../../state/sport/activity/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { ActivityModal } from '../ActivityModal';

import { filterActivities } from '../../../../utils/sport/activity';


export const ActivityPage: React.FC = () => {
  const [group, setGroup] = useState('')
  const [year, setYear] = useState('');

  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const years: Year[] = useSelector((state: RootState) => state.sportyears);      
  const groups: Group[] = useSelector((state: RootState) => state.groups);      
  const activities: Activity[] = useSelector((state: RootState) => state.activities);
  const activity: Activity = useSelector((state: RootState) => state.activity);

  React.useEffect(() => {
    dispatch(clearSelectedActivity());
  }, [dispatch]);  
  
  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = (activity: Activity): void => {
    dispatch(setSelectedActivity(activity));
    setModalOpen([false, true, false, false]);
  };
      
  const openModalChange = (activity: Activity): void => {
    dispatch(setSelectedActivity(activity));
    setModalOpen([false, false, true, false]);
  };
      
  const openModalShow = (activity: Activity): void => {
    dispatch(setSelectedActivity(activity));
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

  const actionSelectionClick = (filter: string, selection: string) => {
    switch (filter) {
      case 'Gruppe':
        setGroup(selection);
        break;
      case 'Jahr':
        setYear(selection);
        break;
      default:
    };
  };

  const actionAdd = async (values: ActivityNoID) => {
    const activityToAdd: ActivityNoID = {
      ...values,
    };
    dispatch(addActivity(activityToAdd));
    closeModal();
  };

  const actionChange = async (values: ActivityNoID) => {
    const activityToChange: Activity = {
      ...values,
      id: activity.id,
    };
    dispatch(updateActivity(activityToChange));
    dispatch(clearSelectedActivity());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeActivity(activity.id));
    dispatch(clearSelectedActivity());
    closeModal();
  };  

  const actionShow = () => {
    dispatch(clearSelectedActivity());
    closeModal();
  };

  const groupOptions: string[] = [];
  Object.values(groups).forEach(element => {
    groupOptions.push(element.name)
  });

  const yearOptions: string[] = [];
  Object.values(years).forEach(element => {
    yearOptions.push(element.name)
  });

  const title = 'Aktivitäten';
  const sortedActivities = filterActivities(activities, group, year);

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '8%' }} className='center aligned'>Gruppe</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '8%' }} className='center aligned'>Datum</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '8%' }} className='center aligned'>Entfernung</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '8%' }} className='center aligned'>Schritte</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '8%' }} className='center aligned'>Dauer</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(sortedActivities).map((activity: Activity, index: number) => (
            <Table.Row key={activity.id}>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{activity.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '8%' } } className='left aligned'>{activity.group}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '8%' } } className='left aligned'>{activity.date}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '8%' } } className='left aligned'>{activity.distance}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '8%' } } className='left aligned'>{activity.steps}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '8%' } } className='left aligned'>{activity.duration}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(activity)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(activity)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(activity)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
  };

  return (
    <div className='App'>
      <ActivityModal
        edittype={Edittype.ADD}
        title='Neue Aktivität anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <ActivityModal
        edittype={Edittype.SHOW}
        title={'Aktivität ' + activity.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <ActivityModal
        edittype={Edittype.EDIT}
        title={'Aktivität ' + activity.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Aktivität löschen'
        prompt={'Aktivität ' + activity.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={title} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Gruppe', event.currentTarget.value)}>
        <option value="" style={styleButton}>Gruppe</option>
        {groupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Jahr', event.currentTarget.value)}>
        <option value="" style={styleButton}>Jahr</option>
        {yearOptions.map((option: string, index: number) => (
          option===year
          ?<option key={index} selected={true} value={option} style={styleButton}>{option}</option>
          :<option key={index} value={option} style={styleButton}>{option}</option>
          ))}
      </Button>
      {Object.values(sortedActivities).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(sortedActivities).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
          </Table>
        </div>
      }
      {Object.values(sortedActivities).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
          <ShowTableHeader/>
          <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default ActivityPage;