import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { styleButton }from '../../../../constants';

import { Option, Edittype } from '../../../../types/basic';
import { Group } from '../../../../../../backend/src/types/basic';
import { Document } from '../../../../../../backend/src/types/document';
import { DocumentWithContentsNoID } from '../../../../types/document';
import { ContentWithFile } from '../../../../types/basic';

import { RootState } from '../../../../state/store';

import { SelectField } from '../../../basic/formfields/selectfield';
import { SelectFieldWithChange } from '../../../basic/formfields/selectfieldwithchange';
import { TextField } from '../../../basic/formfields/textfield';
import { TextFieldWithDelete } from '../../../basic/formfields/textfieldwithdelete';
import { NumberField } from '../../../basic/formfields/numberfield';
import { PickField } from '../../../basic/formfields/pickdatefield';
import { ContentField } from '../../../basic/formfields/contentfield';

import { nextDocument } from '../../../../utils/document/document';
import { content2contentwithfile, newContent, sortContents } from '../../../../utils/basic/content';


interface Props {
  edittype: Edittype;
  document: Document;
  onSubmit: (values: DocumentWithContentsNoID) => void;
  onCancel: () => void;
}

const emptylineStyle = {
  color: 'white',
  fontSize: 8
};

export const DocumentForm: React.FC<Props> = ({ edittype, document, onSubmit, onCancel }) => {
  const [subgroups, setSubgroups] = useState<Array<string>>([]);
  const documents = useSelector((state: RootState) => state.documents);
  const groups = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    const selectedGroup: Group[] = Object.values(groups).filter((documentgroup => documentgroup.name=== document.group));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    setSubgroups(selectedSubgroups);
  }, [groups, document]);  

  const handleGroupSelection = (selection: string) => {
    const selectedGroup: Group[] = Object.values(groups).filter((documentgroup => documentgroup.name=== selection));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    setSubgroups(selectedSubgroups);
  }

  const documentgroupOptions: Option[] = [];
  Object.values(groups).forEach(element => {
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

  const reorderContents = (contentswithfile: ContentWithFile[]): ContentWithFile[] => {
    const contentswithfileSorted: ContentWithFile[] = contentswithfile.map((contentwithfile, index) => {
      contentwithfile.seqnr = index+1;
      return contentwithfile;
    });

    return contentswithfileSorted;
  }
  
  const contentsWithFile: ContentWithFile[] = [];
  let initialValues;
  if (edittype===Edittype.EDIT && document) {
    document.contents = sortContents(document.contents);
    document.contents.forEach(content => {
      const contentWithFile: ContentWithFile = content2contentwithfile(content);
      contentsWithFile.push(contentWithFile);
    })
    initialValues = { 
      ...document, 
      contentswithfile: contentsWithFile
    }
  } else {
    initialValues = { 
      ...nextDocument(documents), 
      contentswithfile: contentsWithFile };
  }

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
        const addKeyword = () => {
          const keywords = values.keywords;
          keywords.push('');
          setFieldValue('keywords', keywords);
        };

        const deleteKeyword = (item: string) => {
          const index = +item.substr('Schlüsselwort #'.length)-1
          const keywords = values.keywords;
          keywords.splice(index,1);
          setFieldValue('keywords', keywords);
        };

        const addContent = () => {
          let contents = values.contentswithfile;
          contents.push(newContent());
          contents = reorderContents(contents);
          setFieldValue('contentswithfile', contents);
        };

        const deleteContent = (item: string) => {
          const index = +item.substr('Datei #'.length)-1
          const contents = values.contentswithfile;
          contents.splice(index,1);
          setFieldValue('contentswithfile', contents);
        };

        const changeContent = (item: string) => {
          const index = +item.substr('Datei #'.length)-1
          const contents = values.contentswithfile;
          contents[index] = newContent();
          setFieldValue('contentswithfile', contents);
        };

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
            {values.contentswithfile.map((content, index) => (
              <Field key={index}
                label={'Datei #' + (index+1)}
                content={content}
                name={`contentswithfile.${index}`}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                removeitem={deleteContent}
                changeitem={changeContent}
                component={ContentField}
              />
            ))}
            <Button type="button" style={styleButton} onClick={() => addContent()}>+Dokument</Button>
            <p style={emptylineStyle}>.</p>
            {values.keywords.map((_keyword, index) => (
              <Field key={index}
                removeitem={deleteKeyword}
                label={'Schlüsselwort #' + (index+1)}
                placeholder='Schlüsselwort'
                name={`keywords.${index}`}
                component={TextFieldWithDelete}
              />
            ))}
            <Button type="button" style={styleButton} onClick={() => addKeyword()}>+Schl.wort</Button>
            <p style={emptylineStyle}>.</p>
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
