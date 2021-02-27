import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { styleButton }from '../../../../constants';

import { Option, Edittype } from '../../../../types/basic';
import { CdNoID } from '../../../../../../backend/src/types/music';

import { RootState } from '../../../../state/store';

import { TextField } from '../../../basic/formfields/textfield';
import { NumberField } from '../../../basic/formfields/numberfield';

import { nextCd } from '../../../../utils/music/cd';


interface Props {
  edittype: Edittype;
  onSubmit: (values: CdNoID) => void;
  onCancel: () => void;
}

export const CdForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const cd = useSelector((state: RootState) => state.cd);
  const cds = useSelector((state: RootState) => state.cds);
  const musicgroups = useSelector((state: RootState) => state.musicgroups);

  const musicgroupOptions: Option[] = [];
  Object.values(musicgroups).forEach(element => {
    musicgroupOptions.push({
      value: element.name,
      label: element.name
    })
  });
  
  const initialValues = (edittype===Edittype.EDIT && cd) ? cd : nextCd(cds);

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
            <Button style={styleButton} type='submit' disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CdForm;
