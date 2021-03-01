import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Input } from 'semantic-ui-react';
import { backgroundColor, styleButton, styleButtonSmall } from '../../../../constants';

import { Group } from '../../../../../../backend/src/types/basic';
import { Artist, ArtistNoID } from '../../../../../../backend/src/types/music';
import { Edittype } from '../../../../types/basic';
import { Characters } from '../../../../types/basic';

import { getAll } from '../../../../services/postgres';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addArtist, updateArtist, removeArtist } from '../../../../state/music/artists/actions';
import { setSelectedArtist, clearSelectedArtist } from '../../../../state/music/artist/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { ArtistModal } from '../ArtistModal';

import { formatData } from '../../../../utils/basic/import';
import { getTitle, getFilteredArtists, createArtistFromPgRecord } from '../../../../utils/music/artist';


export const ArtistPage: React.FC = () => {
  const [filter, setFilter] = React.useState({ startcharacter: '_', group: '', name: '' });

  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const groups: Group[] = useSelector((state: RootState) => state.musicgroups);      
  const artists: Artist[] = useSelector((state: RootState) => state.artists);
  const artist: Artist = useSelector((state: RootState) => state.artist);

  React.useEffect(() => {
    dispatch(clearSelectedArtist());
  }, [dispatch]);  
  
  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = (artist: Artist): void => {
    dispatch(setSelectedArtist(artist));
    setModalOpen([false, true, false, false]);
  };
      
  const openModalChange = (artist: Artist): void => {
    dispatch(setSelectedArtist(artist));
    setModalOpen([false, false, true, false]);
  };
      
  const openModalShow = (artist: Artist): void => {

    dispatch(setSelectedArtist(artist));
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

  const actionSelectionClick = (group: string) => {
    setFilter({ ...filter, group });
  };

  const actionArtistSelection = async (artist: Artist) => {
    dispatch(setSelectedArtist(artist));
    dispatch(setPage({ mainpage: 'music', subpage: 'cd' }));
  };

  const actionAdd = async (values: ArtistNoID) => {
    const artistToAdd: ArtistNoID = {
      ...values,
    };
    dispatch(addArtist(artistToAdd));
    closeModal();
  };

  const actionChange = async (values: ArtistNoID) => {
    const artistToChange: Artist = {
      ...values,
      id: artist.id,
    };
    dispatch(updateArtist(artistToChange));
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeArtist(artist.id));
    dispatch(clearSelectedArtist());
    closeModal();
  };  

  const actionShow = () => {
    closeModal();
  };

  const actionCharacterSelection = (startcharacter: string) => {
    setFilter({ ...filter, startcharacter });
  };

  const actionNameInput = (name: string) => {
    setFilter({ ...filter, name });
  };

  const groupOptions: string[] = [];
  Object.values(groups).forEach(element => {
    groupOptions.push(element.name)
  });
  
  const actionImport = async () => {
    const pgartists: string[] = formatData(await getAll('musik', 'artists'));
    for (let item=0; item<pgartists.length; item++) {
      const pgartist: string = pgartists[item];
      await createArtistFromPgRecord(pgartist);
    }
  };

  const characters: string[] = Object.keys(Characters).filter(k => typeof Characters[k as any]==='number');
  const title: string = getTitle(filter);
  const sortedArtists: Artist[] = getFilteredArtists(artists, filter);

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '40%' }} className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Gruppe</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Anzahl CDs</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(sortedArtists).map((artist: Artist) => (
            <Table.Row key={artist.id}>
              <Table.Cell style={{ backgroundColor, width: '40%' } } className='left aligned' onClick={() => actionArtistSelection(artist)}>{artist.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{artist.group}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{artist.cdnumber}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(artist)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(artist)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(artist)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
  };

  return (
    <div className='App'>
      <ArtistModal
        edittype={Edittype.ADD}
        title='Neuen Interpreten anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <ArtistModal
        edittype={Edittype.SHOW}
        title={'Interpret ' + artist.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <ArtistModal
        edittype={Edittype.EDIT}
        title={'Interpret ' + artist.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Interpret löschen'
        prompt={'Interpret ' + artist.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={title} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick(event.currentTarget.value)}>
        <option value="" style={styleButton}>Gruppe</option>
        {groupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button style={styleButton} onClick={() => actionImport()} disabled={true}>Import</Button>
      {characters.map(character => (
        <Button key={character} style={styleButtonSmall} onClick={() => actionCharacterSelection(character)}>{character}</Button>
      ))}
      <Input placeholder='Name' onChange={(event: React.FormEvent<HTMLInputElement>) => actionNameInput(event.currentTarget.value)}></Input>
      {Object.values(sortedArtists).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(sortedArtists).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
          </Table>
        </div>
      }
      {Object.values(sortedArtists).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
          <ShowTableHeader/>
          <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default ArtistPage;