import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Image } from "semantic-ui-react";

import { Edittype } from "../../../../types/basic";
import { Image as Imagetype } from '../../../../../../backend/src/types/image';
import { BookWithFileNoID, Book, Content } from '../../../../../../backend/src/types/book';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeBook, updateBook } from '../../../../state/book/booklist/actions';
import { clearSelectedBook } from '../../../../state/book/selectedbook/actions';

import { remove, create, update } from "../../../../services/image/images";
       
import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { getContent, getImageUrl } from "../../../../utils/image";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddBookModal from "../AddBookModal";
import AskModal from "../../../basic/askModal";
import ShowModal from "../../../basic/showModal";


const BookDetailsPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean]>([false, false, false]);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const book  = useSelector((state: RootState) => state.book);
    const image = useSelector((state: RootState) => state.image); 
    const imageUrl = (image&&image.id!=='') ? getImageUrl(image) : '';

    const openModalChange = (): void => setModalOpen([true, false, false]);
    const openModalDelete = (): void => setModalOpen([false, true, false]);
    const openModalShow = (): void => setModalOpen([false, false, true]);
    enum ModalDialog {
        CHANGE = 0,
        DELETE = 1,
        SHOW = 2
    }  
    const closeModal = (): void => {
        setModalOpen([false, false, false]);
        setError(undefined);
    };

    const handleChangedBook = async (values: BookWithFileNoID) => {
        if (book) {
            let content: Content;
            if (values.file.name!=='foo.txt') {
                await remove(book.content.dataId);
                const filedata = await getContent(values.file);
                const longInt8View = new Uint8Array(filedata);
                const newImage: Imagetype = await create(longInt8View);
                content = {
                    filename: values.file.name,
                    filetype: values.file.type,
                    filesize: String(values.file.size),
                    dataId: newImage.id
                }
                await update(newImage.id, content);
            }
            else {
                content = {
                    filename: book.content.filename,
                    filetype: book.content.filetype,
                    filesize: book.content.filesize,
                    dataId: book.content.dataId
                }
            }
            const bookToUpdate: Book = {
                id: book.id,
                title: { name: values.title.name, seqnr: values.title.seqnr },
                author: { givenname: values.author.givenname, familyname: values.author.familyname },
                comment: values.comment,
                link: values.link,
                launched: values.launched,
                read: values.read,
                createdAt: values.createdAt,
                modifiedAt: values.modifiedAt,
                bookgroup: values.bookgroup,
                subgroup: values.subgroup,
                ownership: values.ownership,
                format: values.format,
                tongue: values.tongue,
                content: content
            }
            dispatch(updateBook(bookToUpdate));
        }
        closeModal();
        dispatch(clearSelectedBook());
        dispatch(setPage({ mainpage, subpage: 'books' }));
    };    

    const handleClose = () => {
        URL.revokeObjectURL(imageUrl);
        dispatch(clearSelectedBook());
    };

    const  handleDelete = async () => {
        if (book) {
            await remove(book.content.dataId);
            dispatch(removeBook(book.id));
        }
        dispatch(clearSelectedBook());
        dispatch(setPage({ mainpage, subpage: 'books' }));
    };

    if (book===undefined) {
        return (
          <div>
            war wohl nix
          </div>
        );
    }

    const buttons: Item[] = 
    [
      {
        name: 'Schliessen',
        title: 'Schliessen',
        color: 'blue',
        onClick: handleClose
      },
      {
        name: 'Ändern',
        title: 'Ändern',
        color: 'blue',
        onClick: openModalChange
      },
      {
        name: 'Löschen',
        title: 'Löschen',
        color: 'red',
        onClick: openModalDelete
      },
    ];

    return (          
        <div className="App">
            <AppHeaderH3Plus text={book.title.name} icon='zoom-in'/>
            <AddBookModal
                edittype={Edittype.EDIT}
                modalOpen={modalOpen[ModalDialog.CHANGE]}
                onSubmit={handleChangedBook} 
                error={error}
                onClose={closeModal}
            />
            <AskModal
                header='Buch löschen'
                prompt={'Buch löschen ' + book.title.name}
                modalOpen={modalOpen[ModalDialog.DELETE]}
                onSubmit={handleDelete}
                onClose={closeModal}
            />
            <ShowModal
                title={book.title.name}
                imageUrl={imageUrl}
                modalOpen={modalOpen[ModalDialog.SHOW]}
                onClose={closeModal}
            />
            <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
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
                        <Table.Cell><Image className="ui tiny image" src={imageUrl} onClick={() => openModalShow()}/></Table.Cell>
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
                    <Table.Row>
                        <Table.Cell>angelegt</Table.Cell>
                        <Table.Cell>{book.createdAt}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>geändert</Table.Cell>
                        <Table.Cell>{book.modifiedAt}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

export default BookDetailsPage