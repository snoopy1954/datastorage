import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { styleButton, backgroundColor } from '../../../../constants';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';
import { ShowModalPDF } from '../../../basic/showModalPDF';

import { getImageUrl } from '../../../../utils/basic/binarydata';
import { getOneBinarydata } from '../../../../utils/basic/content'


interface Props {
    onCancel: () => void;
}

export const RecipeDetails: React.FC<Props> = ({ onCancel }) => {
    const [url, setUrl] = React.useState('');
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    
    const recipe  = useSelector((state: RootState) => state.recipe);

    const openModalShow = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
    };

    const handleSelection = () => {
        const id = recipe.content.dataId;
        const fetchImage = async () => {
          const image = await getOneBinarydata(id, 'pdf');
          setUrl(getImageUrl(image));
        };
        fetchImage();
        openModalShow();
    };

    const keywords: string[] = recipe.keywords.map((keyword, index) => {
        return index===recipe.keywords.length-1 ? keyword : keyword + ', ';
    });

    return (          
        <div className='App'>
            {url!==''&&<ShowModalPDF
                title={recipe.content.filename}
                pdfUrl={url}
                modalOpen={modalOpen}
                onClose={closeModal}
            />}
            <AppHeaderH3 text={recipe.name} icon='zoom-in'/>
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
                        <Table.Cell>{recipe.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row onClick={() => handleSelection()}>
                        <Table.Cell>Cover</Table.Cell>
                        <Table.Cell>{recipe.content.filename}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Gruppe</Table.Cell>
                        <Table.Cell>{recipe.group}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Untergruppe</Table.Cell>
                        <Table.Cell>{recipe.subgroup}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Schlüsselwörter</Table.Cell>
                        <Table.Cell>{keywords}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{recipe.seqnr}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default RecipeDetails