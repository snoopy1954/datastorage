import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';

import { Cd, CdNoID, Artist, Track } from '../../../../../../backend/src/types/music';
import { Edittype } from '../../../../types/basic';

import { getAll, getOne } from '../../../../services/postgres';

import { RootState } from '../../../../state/store';
import { addCd, updateCd, removeCd, setCds, clearCds } from '../../../../state/music/cds/actions';
// import { setSelectedCd, clearSelectedCd } from '../../../../state/music/cd/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { CdModal } from '../CdModal';

import { formatData } from '../../../../utils/basic/import';
import { getFormatedTime, getFormatedSize } from '../../../../utils/basic/basic';
import { createImageFromFile } from '../../../../utils/basic/content';
import { getArtistFromPgident, updateArtistFromPg } from '../../../../utils/music/artist';
import { createCdFromPgRecord, updateCdFromPg, getFilename, cdTitle, getCdsOfArtist, sortCdsByYear, emptyCd } from '../../../../utils/music/cd';
import { createTrackFromPgRecord } from '../../../../utils/music/track';


export const CdPage: React.FC = () => {
  const [cd, setCd] = React.useState(emptyCd());
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const artists: Artist[] = useSelector((state: RootState) => state.artists);  
  const artist: Artist = useSelector((state: RootState) => state.artist);  
  const cds: Cd[] = useSelector((state: RootState) => state.cds);
//  const cd: Cd = useSelector((state: RootState) => state.cd);

  React.useEffect(() => {
//    dispatch(clearSelectedCd());
    dispatch(clearCds());
    let cdsOfArtist: Cd[] = [];
    const fetchCds = async () => {
      console.log(artist.name)
      cdsOfArtist = await getCdsOfArtist(artist);
      console.log(cdsOfArtist)
      dispatch(setCds(cdsOfArtist));
    };
    fetchCds();
  }, [dispatch, artist]);  
  
  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = (cd: Cd): void => {
    setCd(cd);
//    dispatch(setSelectedCd(cd));
    setModalOpen([false, true, false, false]);
  };
      
  const openModalChange = (cd: Cd): void => {
    setCd(cd);
//    dispatch(setSelectedCd(cd));
    setModalOpen([false, false, true, false]);
  };
      
  const openModalShow = (cd: Cd): void => {
    setCd(cd);
//    dispatch(setSelectedCd(cd));
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
    setCd(emptyCd());
//    dispatch(clearSelectedCd());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeCd(cd.id));
    setCd(emptyCd());
//    dispatch(clearSelectedCd());
    closeModal();
  };  

  const actionShow = () => {
    setCd(emptyCd());
//    dispatch(clearSelectedCd());
    closeModal();
  };

  const actionImport = async () => {
    const pgcds = formatData(await getAll('musik', 'cds'));
    for (let item=10; item<pgcds.length; item++) {
      const pgcd: string = pgcds[item];
      const cd: Cd = await createCdFromPgRecord(pgcd);
      if (cd.id!=='') {
        const artist: Artist = getArtistFromPgident(artists, cd.pgartistident);
        artist.cdidents.push(cd.id);
        artist.cdnumber += 1;
        await updateArtistFromPg(artist);
        const cover = getFilename(cd, artist.name, 'cover');
        const back = getFilename(cd, artist.name, 'back');
        cd.artistident = artist.id;
        cd.coverident = await createImageFromFile(cover);
        cd.backident = await createImageFromFile(back);
        const pgtracks = formatData(await getOne('musik', 'tracks', 'cdident', String(cd.pgid)));
        for (let tracknumber=0; tracknumber<Object.values(pgtracks).length; tracknumber++) {
          const pgtrack = pgtracks[tracknumber];
          const track: Track = await createTrackFromPgRecord(pgtrack, artist.id, cd.id);
          cd.trackidents.push(track.id);
        }
        updateCdFromPg(cd);
      }
    }
  };

  const title = cdTitle(artist);
  const sortedCds: Cd[] = sortCdsByYear(Object.values(cds));
  const filterSelected: boolean = artist.id!=='' ? true : false;

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '20%' }} className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Jahr</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Stücke</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Zeit</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Größe</Table.HeaderCell>
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
              <Table.Cell style={{ backgroundColor, width: '20%' } } className='left aligned'>{cd.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='center aligned'>{cd.year}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='center aligned'>{cd.tracknumber}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='center aligned'>{getFormatedTime(cd.time)}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='center aligned'>{getFormatedSize(cd.size)}</Table.Cell>
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
        title='Neue CD anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        cd={cd}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <CdModal
        edittype={Edittype.SHOW}
        title={'CD ' + cd.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        cd={cd}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <CdModal
        edittype={Edittype.EDIT}
        title={'CD ' + cd.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        cd={cd}
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
      <Button style={styleButton} onClick={() => actionImport()} disabled={true}>Import</Button>
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