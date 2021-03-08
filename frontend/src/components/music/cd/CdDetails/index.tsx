import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Image } from 'semantic-ui-react';
import { styleButton, backgroundColor } from '../../../../constants';

import { Cd, Artist, Track } from '../../../../../../backend/src/types/music';

import { getOneX } from '../../../../services/binarydata/images';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';
import { ShowModal } from "../../../basic/showModal";

import { getTracksOfCd } from '../../../../utils/music/track';
import { getFormatedTime, getFormatedSize } from '../../../../utils/basic/basic';
import { getImageUrl } from "../../../../utils/binarydata/binarydata";


interface Props {
    onCancel: () => void;
}

export const CdDetails: React.FC<Props> = ({ onCancel }) => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const [tracks, setTracks] = React.useState([] as Track[]);
    const [cover, setCover] = React.useState('');
    const [back, setBack] = React.useState('');
    const [url, setUrl] = React.useState('');

    const openModalShow = (type: string): void => {
        setModalOpen(true);
        setUrl(type);
    };

    const closeModal = (): void => {
        setModalOpen(false);
        URL.revokeObjectURL(url);
    };

    const artists: Artist[] = useSelector((state: RootState) => state.artists);
    const cd: Cd  = useSelector((state: RootState) => state.cd);

    useEffect(() => {
        const fetchTracks = async () => {
            const tracksOfCd: Track[] = await getTracksOfCd(cd);
            setTracks(tracksOfCd)
        };
        fetchTracks();
        const fetchCover = async () => {
            const image = await getOneX(cd.coverident, 'jpg');
            setCover(getImageUrl(image));
        };
        fetchCover();
        const fetchBack = async () => {
            const image = await getOneX(cd.backident, 'jpg');
            setBack(getImageUrl(image));
        };
        fetchBack();
    }, [cd]);  

    const artist: Artist = Object.values(artists).filter(artist => artist.id===cd.artistident)[0];

    return (          
        <div className='App'>
            <AppHeaderH3 text={cd.name} icon='zoom-in'/>
            <ShowModal
                title='Vorder- oder Rückseite'
                imageUrl={url}
                modalOpen={modalOpen}
                onClose={closeModal}
            />
            <Table celled style={{ backgroundColor }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Parametername</Table.HeaderCell>
                        <Table.HeaderCell>Wert</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Artist</Table.Cell>
                        <Table.Cell>{artist.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Titel</Table.Cell>
                        <Table.Cell>{cd.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jahr</Table.Cell>
                        <Table.Cell>{cd.year}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Cover</Table.Cell>
                        <Table.Cell>
                            <Image.Group size='tiny'>
                                <Image src={cover} onClick={() => openModalShow(cover)}/>
                                <Image src={back} onClick={() => openModalShow(back)}/>
                            </Image.Group>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Anzahl Stücke</Table.Cell>
                        <Table.Cell>{cd.tracknumber}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Stücke</Table.Cell>
                        <Table.Cell>
                            {tracks.map((track, index) => (
                                <p>{track.name} (Dauer: {getFormatedTime(track.time)})</p>
                            ))}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Dauer</Table.Cell>
                        <Table.Cell>{getFormatedTime(cd.time)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Größe</Table.Cell>
                        <Table.Cell>{getFormatedSize(cd.size)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Kommentar</Table.Cell>
                        <Table.Cell>{cd.comment}</Table.Cell>
                    </Table.Row>
                     <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{cd.seqnr}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default CdDetails