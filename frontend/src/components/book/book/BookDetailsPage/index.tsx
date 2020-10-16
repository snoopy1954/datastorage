import React from "react";
import { Table, Image } from "semantic-ui-react";

import { useStateValue, 
         clearSelectedBook, 
         removeBook, 
         updateBook, 
         setPage 
       } from "../../../../state";
import { Edittype } from "../../../../types/basic";
import { BookWithFileNoID, 
         BookNoID, 
         Content 
       } from "../../../../types/book";
import { Image as Imagetype } from "../../../../types/image";
import AddBookModal from "../AddBookModal";
import AskModal from "../../../basic/askModal";
import { remove, update, getOne } from "../../../../services/book/books";
import { remove as removeImage, 
         create as createImage } from "../../../../services/image/images";
import { getContent } from "../../../../utils/image";
import { backgroundColor, styleMainMenu } from "../../../../constants";
import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";


const BookDetailsPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<[boolean, boolean]>([false, false]);
    const [error, setError] = React.useState<string | undefined>();
    const [{ book, imageUrl }, dispatch] = useStateValue();

    const openModalChange = (): void => setModalOpen([true, false]);
    const openModalDelete = (): void => setModalOpen([false, true]);
    enum ModalDialog {
        CHANGE = 0,
        DELETE = 1
    }  
    const closeModal = (): void => {
        setModalOpen([false, false]);
        setError(undefined);
    };

    const handleChangedBook = async (values: BookWithFileNoID) => {
        if (book) {
            let content: Content;
            if (values.file.name!=='foo.txt') {
                const filedata = await getContent(values.file);
                const longInt8View = new Uint8Array(filedata);
                const newImage: Imagetype = await createImage(longInt8View);
                content = {
                    filename: values.file.name,
                    filetype: values.file.type,
                    filesize: String(values.file.size),
                    dataId: newImage.id
                }
            }
            else {
                content = {
                    filename: book.content.filename,
                    filetype: book.content.filetype,
                    filesize: book.content.filesize,
                    dataId: book.content.dataId
                }
            }
            const bookToUpdate: BookNoID = {
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
            try {
                await update(book.id, bookToUpdate);
                const changedBook = await getOne(book.id);
                dispatch(updateBook(changedBook));
            } catch (e) {
                console.error(e.response.data);
                setError(e.response.data.error);
            }
        }
        closeModal();
        dispatch(clearSelectedBook());
        setPage('books')
    };    

    const handleClose = () => {
        URL.revokeObjectURL(imageUrl);
        dispatch(clearSelectedBook());
    }

    const  handleDelete = async () => {
        if (book) {
            await removeImage(book.content.dataId);
            await remove(book.id);
          dispatch(removeBook(book.id));
        }
        dispatch(clearSelectedBook());
        setPage('books')
    }   
        
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
                        <Table.Cell><Image className="ui tiny image" src={imageUrl}/></Table.Cell>
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