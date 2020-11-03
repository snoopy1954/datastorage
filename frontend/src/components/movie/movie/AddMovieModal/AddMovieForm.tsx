import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Edittype } from "../../../../types/basic";
import { Moviegroup, MovieNoID } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';
import { setSelectedMoviesubgroups } from '../../../../state/movie/selectedmoviesubgroups/actions';

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { newMovie } from '../../../../utils/movie';

import { TextField, SelectField, FileField, Option, SelectFieldWithChange, NumberField } from "./FormField";

interface Props {
  edittype: Edittype;
  onSubmit: (values: MovieNoID) => void;
  onCancel: () => void;
}

export const AddMovieForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const dispatch = useDispatch();

  const movie = useSelector((state: RootState) => state.movie);
  const formats = useSelector((state: RootState) => state.movieformats);
  const moviegroups = useSelector((state: RootState) => state.moviegroups);
  const subgroups = useSelector((state: RootState) => state.moviesubgroups);

  React.useEffect(() => {
    const selectedGroup: Moviegroup[] = Object.values(moviegroups).filter((moviegroup => moviegroup.groupname.name=== movie.moviegroup));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    dispatch(setSelectedMoviesubgroups(selectedSubgroups));
  }, [dispatch, moviegroups, movie]);  

  const handleGroupSelection = (selection: string) => {
    const selectedGroup: Moviegroup[] = Object.values(moviegroups).filter((moviegroup => moviegroup.groupname.name=== selection));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    dispatch(setSelectedMoviesubgroups(selectedSubgroups));
  }

  const groupOptions: Option[] = [];
  Object.values(moviegroups).forEach(element => {
    groupOptions.push({
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

  const subgroupOptions: Option[] = [];
  Object.values(subgroups).forEach(element => {
    subgroupOptions.push({
      value: element,
      label: element
    });
  });
  
  const initialValues = (edittype===Edittype.EDIT && movie) ? movie : newMovie();

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
              label="Kommentar"
              placeholder="Kommentar"
              name="comment"
              component={TextField}
            />
            <SelectFieldWithChange
              label="Gruppe"
              prompt="Bitte Gruppe auswählen"
              name="moviegroup"
              options={groupOptions}
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
            <Field
              label="Datei"
              placeholder="Datei"
              name="filename"
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

export default AddMovieForm;
