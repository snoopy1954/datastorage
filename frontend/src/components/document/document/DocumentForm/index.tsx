import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { styleButton }from '../../../../constants';

import { Option, Edittype } from '../../../../types/basic';
import { Group } from '../../../../../../backend/src/types/basic';
import { DocumentWithFileNoID } from '../../../../types/document';

import { RootState } from '../../../../state/store';
import { setSelectedSubgroups } from '../../../../state/book/selectedsubgroups/actions';

import { SelectField } from '../../../basic/formfields/selectfield';
import { SelectFieldWithChange } from '../../../basic/formfields/selectfieldwithchange';
import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { FileField } from '../../../basic/formfields/filefield';
import { TextFieldArray } from '../../../basic/formfields/textfieldarray';
import { PickField } from '../../../basic/formfields/pickdatefield';

import { nextDocument } from '../../../../utils/document/document';


interface Props {
  edittype: Edittype;
  onSubmit: (values: DocumentWithFileNoID) => void;
  onCancel: () => void;
}

export const DocumentForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const dispatch = useDispatch();

  const document = useSelector((state: RootState) => state.document);
  const documents = useSelector((state: RootState) => state.documents);
  const documentgroups = useSelector((state: RootState) => state.documentgroups);
  const subgroups = useSelector((state: RootState) => state.subgroups);

  React.useEffect(() => {
    const selectedGroup: Group[] = Object.values(documentgroups).filter((documentgroup => documentgroup.name=== document.group));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    dispatch(setSelectedSubgroups(selectedSubgroups));
  }, [dispatch, documentgroups, document]);  

  const handleGroupSelection = (selection: string) => {
    const selectedGroup: Group[] = Object.values(documentgroups).filter((documentgroup => documentgroup.name=== selection));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    dispatch(setSelectedSubgroups(selectedSubgroups));
  }

  const documentgroupOptions: Option[] = [];
  Object.values(documentgroups).forEach(element => {
    documentgroupOptions.push({
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
  
  const cover: File = new File([''], 'filename');

  const initialValues = edittype===Edittype.EDIT && document
  ? { ...document, file: cover } 
  : { ...nextDocument(documents), file: cover };

  console.log(document.keywords)
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Pflichtfeld";
        const errors: { [field: string]: string } = {};
        // console.log('validate', values.file)
        // if (values.file.size===0) {
        //   errors.file = requiredError;
        // }
        // else {
        //   delete errors.file;
        // }
        // console.log(errors)
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Titel'
              placeholder='Titel'
              name='name'
              component={TextField}
            />
            <Field
              label='Seqnr'
              placeholder='Seqnr'
              name='seqnr'
              component={NumberField}
              min='0'
            />
            <Field
              label='Gruppe'
              prompt='Bitte Gruppe auswählen'
              name='group'
              options={documentgroupOptions}
              hasChanged={handleGroupSelection}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={SelectFieldWithChange}
            />
            <Field
              label='Untergruppe'
              prompt='Untergruppe auswählen'
              name='subgroup'
              options={subgroupOptions}
              component={SelectField}
            />
            <Field
              label='Datei'
              placeholder='Datei'
              name='file'
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={FileField}
            />
            <Field
              name='keywords'
              items={values.keywords}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={TextFieldArray}
            />
            <Field
              label='Jahr'
              placeholder='Jahr'
              name='year'
              component={TextField}
            />
            <Field
              name='date'
              label='Datum'
              date={values.date}
              component={PickField}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label='Kommentar'
              placeholder='Kommentar'
              name='comment'
              component={TextField}
            />
            <Field
              label='Person'
              placeholder='Person'
              name='person'
              component={TextField}
            />
            <Button style={styleButton} type='submit' disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DocumentForm;
