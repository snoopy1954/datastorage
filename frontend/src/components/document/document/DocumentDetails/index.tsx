import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { styleButton, backgroundColor } from '../../../../constants';

import { Document } from '../../../../../../backend/src/types/document';
import { Binarydata } from '../../../../../../backend/src/types/basic';
import { Content2 } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';
import { ShowModalPDF } from '../../../basic/showModalPDF';

import { getImageUrl } from '../../../../utils/basic/binarydata';
import { getOneBinarydata } from '../../../../utils/basic/content'
import { sortContents } from '../../../../utils/basic/content';


interface Props {
    onCancel: () => void;
}

export const DocumentDetails: React.FC<Props> = ({ onCancel }) => {
    const [url, setUrl] = React.useState('');
    const [title, setTitle] = React.useState<string>('');
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const document: Document = useSelector((state: RootState) => state.document);

    const openModalShow = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
    };

    const handleSelection = (content: Content2) => {
        const id: string = content.dataId;
        const fetchImage = async () => {
          const binarydata: Binarydata = await getOneBinarydata(id, 'pdf');
          setUrl(getImageUrl(binarydata));
        };
        fetchImage();
        setTitle(content.filename);
        openModalShow();
    };

    const sortedContents: Content2[] = sortContents(document.contents);

    return (          
        <div className='App'>
            {url!==''&&<ShowModalPDF
                title={title}
                pdfUrl={url}
                modalOpen={modalOpen}
                onClose={closeModal}
            />}
            <AppHeaderH3 text={document.name} icon='zoom-in'/>
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
                        <Table.Cell>{document.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Dateien</Table.Cell>
                        <Table.Cell>
                            {sortedContents!==[]&&sortedContents.map((content, index) => (
                                <p onClick={() => handleSelection(content)}>{content.filename}</p>
                            ))}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Gruppe</Table.Cell>
                        <Table.Cell>{document.group}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Untergruppe</Table.Cell>
                        <Table.Cell>{document.subgroup}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Schlüsselwörter</Table.Cell>
                        <Table.Cell>
                            {document.keywords!==[]&&document.keywords.map(keyword => (
                                <p>{keyword}</p>
                            ))}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jahr</Table.Cell>
                        <Table.Cell>{document.year}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Datum</Table.Cell>
                        <Table.Cell>{document.date}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Person</Table.Cell>
                        <Table.Cell>{document.person}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Kommentar</Table.Cell>
                        <Table.Cell>{document.comment}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{document.seqnr}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default DocumentDetails