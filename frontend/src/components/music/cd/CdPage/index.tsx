import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';
import { Image } from 'semantic-ui-react';

import { Group } from '../../../../../../backend/src/types/basic';
import { Cd, CdNoID, Artist, Track } from '../../../../../../backend/src/types/music';
import { Edittype } from '../../../../types/basic';

import { getAll, getOne } from '../../../../services/postgres';

import { RootState } from '../../../../state/store';
import { addCd, updateCd, removeCd } from '../../../../state/music/cds/actions';
import { setSelectedCd, clearSelectedCd } from '../../../../state/music/cd/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { CdModal } from '../CdModal';

import { formatData } from '../../../../utils/basic/import';
import { createImageFromFilename } from '../../../../utils/basic/image';
import { getArtistFromPgident, updateArtistFromPg } from '../../../../utils/music/artist';
import { createCdFromPgRecord, updateCdFromPg, getFilename, cdTitle } from '../../../../utils/music/cd';
import { createTrackFromPgRecord } from '../../../../utils/music/track';


export const CdPage: React.FC = () => {
  const [group, setGroup] = useState('');

  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const groups: Group[] = useSelector((state: RootState) => state.musicgroups);    
  const artists: Artist[] = useSelector((state: RootState) => state.artists);  
  const artist: Artist = useSelector((state: RootState) => state.artist);  
  const cds: Cd[] = useSelector((state: RootState) => state.cds);
  const cd: Cd = useSelector((state: RootState) => state.cd);

  React.useEffect(() => {
    dispatch(clearSelectedCd());
  }, [dispatch]);  
  
  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = (cd: Cd): void => {
    dispatch(setSelectedCd(cd));
    setModalOpen([false, true, false, false]);
  };
      
  const openModalChange = (cd: Cd): void => {
    dispatch(setSelectedCd(cd));
    setModalOpen([false, false, true, false]);
  };
      
  const openModalShow = (cd: Cd): void => {
    dispatch(setSelectedCd(cd));
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
      default:
    };
  };

  const actionAdd = async (values: CdNoID) => {
    const cdToAdd: CdNoID = {
      ...values,
    };
    dispatch(addCd(cdToAdd));
    closeModal();
  };

  const actionChange = async (values: CdNoID) => {
    const cdToChange: Cd = {
      ...values,
      id: cd.id,
    };
    dispatch(updateCd(cdToChange));
    dispatch(clearSelectedCd());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeCd(cd.id));
    dispatch(clearSelectedCd());
    closeModal();
  };  

  const actionShow = () => {
    dispatch(clearSelectedCd());
    closeModal();
  };

  const groupOptions: string[] = [];
  Object.values(groups).forEach(element => {
    groupOptions.push(element.name)
  });

//   const handleTest = () => {
//     const id = '60367ff04a18b530cdd6977f';
//     const fetchImage = async () => {
//       const binarydata: Binarydata = await getImage(id);
//       setUrl(getImageUrl(binarydata));
//     };
//     fetchImage();
// };

  const handleImport = async () => {
    const pgcds = formatData(await getAll('musik', 'cds'));
    for (let item=500; item<2000; item++) {
      const pgcd: string = pgcds[item];
      const cd: Cd = await createCdFromPgRecord(pgcd);
      console.log(cd)
      if (cd.id!=='') {
        const artist: Artist = getArtistFromPgident(artists, cd.artistident);
        artist.cdidents.push(cd.id);
        artist.cdnumber += 1;
        await updateArtistFromPg(artist);
        const cover = getFilename(cd, artist.name, 'cover');
        const back = getFilename(cd, artist.name, 'back');
        cd.artistident = artist.id;
        cd.coverident = await createImageFromFilename(cover);
        cd.backident = await createImageFromFilename(back);
        const pgtracks = formatData(await getOne('musik', 'tracks', 'cdident', cd.pgid));
        for (let tracknumber=0; tracknumber<Object.values(pgtracks).length; tracknumber++) {
          const pgtrack = pgtracks[tracknumber];
          console.log(pgtrack)
          const track: Track = await createTrackFromPgRecord(pgtrack, artist.id, cd.id);
          console.log(track)
          cd.trackidents.push(track.id);
        }
        updateCdFromPg(cd);
      }
    }
  };
//URIError: Failed to decode param '%7Cmnt%7CMP3%7CMP3-Rock-CD%7C_Various%20Rock%7C100%%20Rock%20Vol.3%20CD1%7Ccover.jpg'
  const title = cdTitle(artist);
  const sortedCds = cds;
  const filterSelected: boolean = artist.id!=='' ? true : false;

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '50%' }} className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(sortedCds).map((cd: Cd, index: number) => (
            <Table.Row key={cd.id}>
              <Table.Cell style={{ backgroundColor, width: '50%' } } className='left aligned'>{cd.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(cd)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(cd)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(cd)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
  };

  return (
    <div className='App'>
      <CdModal
        edittype={Edittype.ADD}
        title='Neuen CD anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <CdModal
        edittype={Edittype.SHOW}
        title={'CD ' + cd.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <CdModal
        edittype={Edittype.EDIT}
        title={'CD ' + cd.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='CD löschen'
        prompt={'CD ' + cd.name + ' löschen?'}
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
      <Button style={styleButton} onClick={() => handleImport()} disabled={false}>Import</Button>
      {!filterSelected&&<AppHeaderH3 text='Interpret auswählen!' icon='search'/>}
      {Object.values(sortedCds).length>8&&filterSelected&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(sortedCds).length>8&&filterSelected&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
          </Table>
        </div>
      }
      {Object.values(sortedCds).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
          <ShowTableHeader/>
          <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default CdPage;