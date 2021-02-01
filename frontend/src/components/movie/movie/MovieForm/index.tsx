import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Option, Edittype } from "../../../../types/basic";
import { Moviegroup, MovieNoID } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';
import { setSelectedMoviesubgroups } from '../../../../state/movie/selectedmoviesubgroups/actions';

import { SelectField } from '../../../basic/formfields/selectfield';
import { SelectFieldWithChange } from '../../../basic/formfields/selectfieldwithchange';
import { TextField } from '../../../basic/formfields/textfield';
import { ShowField } from '../../../basic/formfields/showfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { FileFieldWithChecksum } from '../../../basic/formfields/filefieldwithchecksum';

import { newMovie } from '../../../../utils/movie/movie';


interface Props {
  edittype: Edittype;
  onSubmit: (values: MovieNoID) => void;
  onCancel: () => void;
}

export const MovieForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const dispatch = useDispatch();

  const movie = useSelector((state: RootState) => state.movie);
  const formats = useSelector((state: RootState) => state.movieformats);
  const moviegroups = useSelector((state: RootState) => state.moviegroups);
  const subgroups = useSelector((state: RootState) => state.moviesubgroups);

  React.useEffect(() => {
    const selectedGroup: Moviegroup[] = Object.values(moviegroups).filter((moviegroup => moviegroup.name=== movie.moviegroup));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    dispatch(setSelectedMoviesubgroups(selectedSubgroups));
  }, [dispatch, moviegroups, movie]);  

  const handleGroupSelection = (selection: string) => {
    const selectedGroup: Moviegroup[] = Object.values(moviegroups).filter((moviegroup => moviegroup.name=== selection));
    const selectedSubgroups: string[] = selectedGroup.length===0 ? [] : selectedGroup[0].subgroups;
    dispatch(setSelectedMoviesubgroups(selectedSubgroups));
  }

  const groupOptions: Option[] = [];
  Object.values(moviegroups).forEach(element => {
    groupOptions.push({
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
              label="Kommentar"
              placeholder="Kommentar"
              name="comment"
              component={TextField}
            />
            <Field
              label="Gruppe"
              prompt="Bitte Gruppe auswählen"
              name="moviegroup"
              options={groupOptions}
              component={SelectFieldWithChange}
              hasChanged={handleGroupSelection}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Untergruppe"
              prompt="Untergruppe auswählen"
              name="subgroup"
              component={SelectField}
              options={subgroupOptions}
            />
            <Field
              label="Format"
              prompt="Bitte Format auswählen"
              name="format"
              component={SelectField}
              options={formatOptions}
            />
            <Field
              label="erschienen"
              placeholder="erschienen"
              name="launched"
              component={TextField}
            />
            <Field
              label="Datei"
              placeholder="Datei"
              name="filename"
              component={FileFieldWithChecksum}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Checksum"
              placeholder={values.checksum}
              name="checksum"
              component={ShowField}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MovieForm;
