import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Option, Edittype } from "../../../../types/basic";
import { Bookgroup } from '../../../../../../backend/src/types/book';
import { BookWithContentNoID } from '../../../../types/book';
import { ContentWithFile } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { setSelectedSubgroups } from '../../../../state/book/selectedsubgroups/actions';

import { SelectField } from '../../../basic/formfields/selectfield';
import { SelectFieldWithChange } from '../../../basic/formfields/selectfieldwithchange';
import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { ContentFieldSimple } from '../../../basic/formfields/contentfieldsimple';

import { nextBook } from '../../../../utils/book/book';
import { newContent } from '../../../../utils/basic/content';


interface Props {
  edittype: Edittype;
  onSubmit: (values: BookWithContentNoID) => void;
  onCancel: () => void;
}

export const BookForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const dispatch = useDispatch();

  const book = useSelector((state: RootState) => state.book);
  const books = useSelector((state: RootState) => state.books);
  const tongues = useSelector((state: RootState) => state.tongues);
  const formats = useSelector((state: RootState) => state.formats);
  const ownerships = useSelector((state: RootState) => state.ownerships);
  const bookgroups = useSelector((state: RootState) => state.bookgroups);
  const subgroups = useSelector((state: RootState) => state.subgroups);

  useEffect(() => {
    const selectedGroup: Bookgroup[] = Object.values(bookgroups).filter((bookgroup => bookgroup.name=== book.bookgroup));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    dispatch(setSelectedSubgroups(selectedSubgroups));
  }, [dispatch, bookgroups, book]);  

  const handleGroupSelection = (selection: string) => {
    const selectedGroup: Bookgroup[] = Object.values(bookgroups).filter((bookgroup => bookgroup.name=== selection));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    dispatch(setSelectedSubgroups(selectedSubgroups));
  }

  const bookgroupOptions: Option[] = [];
  Object.values(bookgroups).forEach(element => {
    bookgroupOptions.push({
      value: element.name,
      label: element.name
    })
  });

  const formatOptions: Option[] = [];
  Object.values(formats).forEach(element => {
    formatOptions.push({
      value: element.name,
      label: element.name
    })
  });

  const ownershipOptions: Option[] = [];
  Object.values(ownerships).forEach(element => {
    ownershipOptions.push({
      value: element.name,
      label: element.name
    })
  });

  const tongueOptions: Option[] = [];
  Object.values(tongues).forEach(element => {
    tongueOptions.push({
      value: element.name,
      label: element.name
    })
  });

  const subgroupOptions: Option[] = [];
  Object.values(subgroups).forEach(element => {
    subgroupOptions.push({
      value: element,
      label: element
    });
  });
  
  const contentwithfile: ContentWithFile = newContent();

  const initialValues = edittype===Edittype.EDIT && book
  ? { ...book, contentwithfile } 
  : { ...nextBook(books), contentwithfile };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const errors: { [field: string]: string } = {};
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
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
            <Field
              label="Buchgruppe"
              prompt="Bitte Buchgruppe auswählen"
              name="bookgroup"
              options={bookgroupOptions}
              hasChanged={handleGroupSelection}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={SelectFieldWithChange}
            />
            <Field
              label="Untergruppe"
              prompt="Untergruppe auswählen"
              name="subgroup"
              options={subgroupOptions}
              component={SelectField}
            />
            <Field
              label="Format"
              prompt="Bitte Format auswählen"
              name="format"
              options={formatOptions}
              component={SelectField}
            />
            <Field
              label="Besitzform"
              prompt="Bitte Besitzform auswählen"
              name="ownership"
              options={ownershipOptions}
              component={SelectField}
            />
            <Field
              label="Sprache"
              prompt="Bitte Sprache auswählen"
              name="tongue"
              options={tongueOptions}
              component={SelectField}
            />
            <Field
              label="Datei"
              content={values.contentwithfile}
              name='contentwithfile'
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={ContentFieldSimple}
            />
             <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BookForm;
