import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { TextField, SelectField, FileField, Option, SelectFieldWithChange, NumberField } from "./FormField";
import { Edittype } from "../../../../types/basic";
import { Bookgroup, BookWithFileNoID } from "../../../../types/book";
import { useStateValue, setFilteredSubgroups } from "../../../../state";

interface Props {
  edittype: Edittype;
  onSubmit: (values: BookWithFileNoID) => void;
  onCancel: () => void;
}

export const AddBookForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const [{ bookgroups, formats, ownerships, tongues, book, selectedSubgroups }, dispatch] = useStateValue();

  const handleGroupSelection = (selection: string) => {
    const selectedGroup: Bookgroup[] = Object.values(bookgroups).filter((bookgroup => bookgroup.groupname.name=== selection));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    dispatch(setFilteredSubgroups(selectedSubgroups));
  }

  const bookgroupOptions: Option[] = [];
  Object.values(bookgroups).forEach(element => {
    bookgroupOptions.push({
      value: element.groupname.name,
      label: element.groupname.name
    })
  });

  const formatOptions: Option[] = [];
  Object.values(formats).forEach(element => {
    formatOptions.push({
      value: element.formatname.name,
      label: element.formatname.name
    })
  });

  const ownershipOptions: Option[] = [];
  Object.values(ownerships).forEach(element => {
    ownershipOptions.push({
      value: element.ownershipname.name,
      label: element.ownershipname.name
    })
  });

  const tongueOptions: Option[] = [];
  Object.values(tongues).forEach(element => {
    tongueOptions.push({
      value: element.tonguename.name,
      label: element.tonguename.name
    })
  });

  const subgroupOptions: Option[] = [];
  selectedSubgroups.forEach(element => {
    subgroupOptions.push({
      value: element,
      label: element
    });
  });
  
  const initialValues = edittype===Edittype.EDIT && book
  ? {
      title: {
        name: book.title.name,
        seqnr: book.title.seqnr
      },
      author: {
        givenname: book.author.givenname,
        familyname: book.author.familyname
      },
      comment: book.comment,
      link: book.link,
      launched: book.launched,
      read: book.read,
      createdAt: book.createdAt,
      modifiedAt: new Date(),
      bookgroup: book.bookgroup,
      subgroup: book.subgroup,
      ownership: book.ownership,
      format: book.format,
      tongue: book.tongue,
      content: {
        filename: book.content.filename,
        filetype: book.content.filetype,
        filesize: book.content.filesize,
        dataId: book.content.dataId
      },
      file: new File(["foo"], "foo.txt", {
        type: "text/plain",
      }),
    }
  : {
      title: {
        name: "",
        seqnr: 0
      },
      author: {
        givenname: "",
        familyname: ""
      },
      comment: "",
      link: "",
      launched: "",
      read: "",
      createdAt: new Date(),
      modifiedAt: new Date(),
      bookgroup: "",
      subgroup: "",
      ownership: "",
      format: "",
      tongue: "",
      content: {
        filename: "",
        filetype: "",
        filesize: "",
        dataId: ""
      },
      file: new File(["foo"], "foo.txt", {
        type: "text/plain",
      }),
    }
  ;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const errors: { [field: string]: string } = {};
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Titel"
              placeholder="Titel"
              name="title.name"
              component={TextField}
            />
            <Field
              label="Seqnr"
              placeholder="Seqnr"
              name="title.seqnr"
              component={NumberField}
              min='0'
            />
            <Field
              label="Vorname"
              placeholder="Vorname"
              name="author.givenname"
              component={TextField}
            />
            <Field
              label="Nachname"
              placeholder="Nachname"
              name="author.familyname"
              component={TextField}
            />
            <Field
              label="Kommentar"
              placeholder="Kommentar"
              name="comment"
              component={TextField}
            />
            <Field
              label="Link"
              placeholder="Link"
              name="link"
              component={TextField}
            />
            <Field
              label="erschienen"
              placeholder="erschienen"
              name="launched"
              component={TextField}
            />
            <Field
              label="gelesen"
              placeholder="gelesen"
              name="read"
              component={TextField}
            />
            <Field
              label="angelegt"
              placeholder="angelegt"
              name="createdAt"
              component={TextField}
            />
            <Field
              label="geändert"
              placeholder="geändert"
              name="modifiedAt"
              component={TextField}
            />
            <SelectFieldWithChange
              label="Buchgruppe"
              prompt="Bitte Buchgruppe auswählen"
              name="bookgroup"
              options={bookgroupOptions}
              hasChanged={handleGroupSelection}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <SelectField
              label="Untergruppe"
              prompt="Untergruppe auswählen"
              name="subgroup"
              options={subgroupOptions}
            />
            <SelectField
              label="Format"
              prompt="Bitte Format auswählen"
              name="format"
              options={formatOptions}
            />
            <SelectField
              label="Besitzform"
              prompt="Bitte Besitzform auswählen"
              name="ownership"
              options={ownershipOptions}
            />
            <SelectField
              label="Sprache"
              prompt="Bitte Sprache auswählen"
              name="tongue"
              options={tongueOptions}
            />
            <Field
              label="Datei"
              placeholder="Datei"
              name="image.filename"
              component={FileField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Menu compact stackable borderless style={{ background: backgroundColor }}>
              <Menu.Item>
                <Button type="submit" style={styleMainMenu} color="blue" disabled={!dirty || !isValid}>Speichern</Button>
              </Menu.Item>
              <Menu.Item>
                <Button type="button" style={styleMainMenu} onClick={onCancel} color="blue">Abbrechen</Button>
              </Menu.Item>
            </Menu>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddBookForm;
