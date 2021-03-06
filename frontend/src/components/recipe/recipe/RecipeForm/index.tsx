import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Option, Edittype } from "../../../../types/basic";
import { Group } from '../../../../../../backend/src/types/basic';
import { RecipeWithContentNoID } from '../../../../types/recipe';
import { Recipe } from '../../../../../../backend/src/types/recipe';
import { ContentWithFile } from '../../../../types/basic';

import { RootState } from '../../../../state/store';

import { SelectField } from '../../../basic/formfields/selectfield';
import { SelectFieldWithChange } from '../../../basic/formfields/selectfieldwithchange';
import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { ContentFieldSimple } from '../../../basic/formfields/contentfieldsimple';
import { TextFieldArray } from '../../../basic/formfields/textfieldarray';
import { nextRecipe } from '../../../../utils/recipe/recipe';
import { newContent } from '../../../../utils/basic/content';

interface Props {
  edittype: Edittype;
  recipe: Recipe;
  onSubmit: (values: RecipeWithContentNoID) => void;
  onCancel: () => void;
}

export const RecipeForm: React.FC<Props> = ({ edittype, recipe, onSubmit, onCancel }) => {
  const [subgroups, setSubgroups] = useState<Array<string>>([]);

  const recipes = useSelector((state: RootState) => state.recipes);
  const groups = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    const selectedGroup: Group[] = Object.values(groups).filter((group => group.name=== recipe.group));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    setSubgroups(selectedSubgroups);
  }, [groups, recipe]);  

  const handleGroupSelection = (selection: string) => {
    const selectedGroup: Group[] = Object.values(groups).filter((group => group.name=== selection));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    setSubgroups(selectedSubgroups);
  }

  const groupOptions: Option[] = [];
  Object.values(groups).forEach(element => {
    groupOptions.push({
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

  const initialValues = edittype===Edittype.EDIT && recipe
  ? { ...recipe, contentwithfile } 
  : { ...nextRecipe(recipes), contentwithfile };

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
              name="name"
              component={TextField}
            />
            <Field
              label="Seqnr"
              placeholder="Seqnr"
              name="seqnr"
              component={NumberField}
              min='0'
            />
            <Field
              label="Gruppe"
              prompt="Bitte Gruppe auswählen"
              name="group"
              options={groupOptions}
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
              label="Datei"
              content={values.contentwithfile}
              name='contentwithfile'
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={ContentFieldSimple}
            />
            <Field
              name='keywords'
              items={values.keywords}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={TextFieldArray}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RecipeForm;
