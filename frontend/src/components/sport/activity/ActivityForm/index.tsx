import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { styleButton }from '../../../../constants';

import { Option, Edittype } from '../../../../types/basic';
import { ActivityNoID } from '../../../../../../backend/src/types/sport';

import { RootState } from '../../../../state/store';

import { SelectField } from '../../../basic/formfields/selectfield';
import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { PickField } from '../../../basic/formfields/pickdatefield';

import { nextActivity } from '../../../../utils/sport/activity';


interface Props {
  edittype: Edittype;
  onSubmit: (values: ActivityNoID) => void;
  onCancel: () => void;
}

export const ActivityForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const activity = useSelector((state: RootState) => state.activity);
  const activities = useSelector((state: RootState) => state.activities);
  const groups = useSelector((state: RootState) => state.groups);

  const sportgroupOptions: Option[] = [];
  Object.values(groups).forEach(element => {
    sportgroupOptions.push({
      value: element.name,
      label: element.name
    })
  });
  
  const initialValues = (edittype===Edittype.EDIT && activity) ? activity : nextActivity(activities);

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
              label="Gruppe"
              prompt="Bitte Gruppe auswählen"
              name="group"
              options={sportgroupOptions}
              component={SelectField}
            />
            <Field
              label='Strecke'
              placeholder='Strecke'
              name='distance'
              component={TextField}
            />
            <Field
              label='Dauer'
              placeholder='Dauer'
              name='duration'
              component={TextField}
            />
            <Field
              label='Schritte'
              placeholder='Schritte'
              name='steps'
              component={TextField}
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
            <Button style={styleButton} type='submit' disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ActivityForm;
