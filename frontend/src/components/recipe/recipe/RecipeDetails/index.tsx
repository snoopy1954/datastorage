import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { styleButton, backgroundColor } from '../../../../constants';

import { getOne as getImage } from '../../../../services/image/images';

import { RootState } from '../../../../state/store';
import { setPdfUrl, clearPdfUrl } from '../../../../state/axa/pdfUrl/actions';

import { AppHeaderH3 } from '../../../basic/header';

import { getImageUrl } from '../../../../utils/image';

import { ShowModalPDF } from '../../../basic/showModalPDF';


interface Props {
    onCancel: () => void;
}

export const RecipeDetails: React.FC<Props> = ({ onCancel }) => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    
    const recipe  = useSelector((state: RootState) => state.recipe);
    const pdfUrl = useSelector((state: RootState) => state.pdfurl);

    const openModalShow = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        URL.revokeObjectURL(pdfUrl);
        dispatch(clearPdfUrl());
    };

    const handleSelection = () => {
        const id = recipe.content.dataId;
        const fetchImage = async () => {
          const newImage = await getImage(id);
          dispatch(setPdfUrl(getImageUrl(newImage)));
        };
        fetchImage();
        openModalShow();
    };

    const keywords = 'noch nichts da';

    return (          
        <div className='App'>
            {pdfUrl!==''&&<ShowModalPDF
                title={recipe.content.filename}
                pdfUrl={pdfUrl}
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