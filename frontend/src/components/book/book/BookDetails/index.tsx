import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Image, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Binarydata } from '../../../../../../backend/src/types/image';

import { getOneX } from '../../../../services/binarydata/images';

import { RootState } from '../../../../state/store';
import { clearSelectedBook } from '../../../../state/book/selectedbook/actions';
       
import { AppHeaderH3 } from "../../../basic/header";

import { getImageUrl as getUrl } from '../../../../utils/binarydata/binarydata';

import ShowModal from "../../../basic/showModal";


interface Props {
    onCancel: () => void;
}

export const BookDetails: React.FC<Props> = ({ onCancel }) => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [url, setUrl] = React.useState('');

    const dispatch = useDispatch();

    const book  = useSelector((state: RootState) => state.book);

    useEffect(() => {
        const fetchCover = async () => {
            const id: string = book.content.dataId;
            const image: Binarydata = await getOneX(id, 'jpg');
            const url = (image&&image.id!=='') ? getUrl(image) : '';
            setUrl(url);          
        };
        fetchCover();
    }, [book]);  

    const openModalShow = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        URL.revokeObjectURL(url);
        dispatch(clearSelectedBook());
    };

    return (          
        <div className="App">
            <AppHeaderH3 text={book.title.name} icon='zoom-in'/>
             <ShowModal
                title={book.title.name}
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
                        <Table.Cell>Titel</Table.Cell>
                        <Table.Cell>{book.title.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Cover</Table.Cell>
                        <Table.Cell><Image className="ui tiny image" src={url} onClick={() => openModalShow()}/></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Autor</Table.Cell>
                        <Table.Cell>{book.author.givenname} {book.author.familyname}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Kommentar</Table.Cell>
                        <Table.Cell>{book.comment}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Link</Table.Cell>
                        <Table.Cell><a href={book.link} target='_blank' rel="noopener noreferrer">{book.link}</a></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Gruppe</Table.Cell>
                        <Table.Cell>{book.bookgroup}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Untergruppe</Table.Cell>
                        <Table.Cell>{book.subgroup}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Format</Table.Cell>
                        <Table.Cell>{book.format}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Besitz</Table.Cell>
                        <Table.Cell>{book.ownership}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Sprache</Table.Cell>
                        <Table.Cell>{book.tongue}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>erschienen</Table.Cell>
                        <Table.Cell>{book.launched}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>gelesen</Table.Cell>
                        <Table.Cell>{book.read}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{book.title.seqnr}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default BookDetails