import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { Option } from '../../../../types/basic';
import { Address, AddressNoID } from '../../../../../../backend/src/types/address';
import { Group } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';

import { SelectField } from '../../../basic/formfields/selectfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { TextField } from '../../../basic/formfields/textfield';
import { PersonFieldArray } from '../../../basic/formfields/personfieldarray';

import { newAddress } from '../../../../utils/address/address';


interface Props {
  edittype: Edittype;
  address: Address;
  onSubmit: (values: AddressNoID) => void;
  onCancel: () => void;
};

export const AddressForm: React.FC<Props> = ({ edittype, address, onSubmit, onCancel }) => {
  const groups: Group[] = useSelector((state: RootState) => state.groups);

  const addressgroupOptions: Option[] = [];
  Object.values(groups).forEach(element => {
    addressgroupOptions.push({
      value: element.name,
      label: element.name
    })
  });

  const initialValues = (edittype===Edittype.EDIT && address) ? address : newAddress();

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
              label="Name"
              placeholder="Name"
              name="name.name"
              component={TextField}
            />
            <Field
              label="Seqnr"
              placeholder="Seqnr"
              name="name.seqnr"
              component={NumberField}
            />
            <Field
              label="Gruppe"
              name="group"
              prompt="Bitte Gruppe auswählen"
              component={SelectField}
              options={addressgroupOptions}
            />
            <Field
              label="Straße"
              placeholder="Straße"
              name="completeAddress.street"
              component={TextField}
            />
            <Field
              label="Hausnummer"
              placeholder="Hausnummer"
              name="completeAddress.number"
              component={TextField}
            />
            <Field
              label="Postleitzahl"
              placeholder="Postleitzahl"
              name="completeAddress.zipcode"
              component={TextField}
            />
            <Field
              label="Stadt"
              placeholder="Stadt"
              name="completeAddress.city"
              component={TextField}
            />
            <PersonFieldArray
              persons={values.persons}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddressForm;
