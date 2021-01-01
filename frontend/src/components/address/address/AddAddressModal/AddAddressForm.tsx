import React from "react";
import { useSelector } from 'react-redux';
import { Menu, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Edittype } from '../../../../types/basic';
import { Option } from '../../../../types/basic';
import { Addressgroup, Address, AddressNoID } from '../../../../../../backend/src/types/address';

import { RootState } from '../../../../state/store';

import { SelectField } from '../../../basic/formfields/selectfield';
import { NumberField } from '../../../basic/formfields/numberfield';
import { TextField } from '../../../basic/formfields/textfield';
import { PersonFieldArray } from './FormField';

import { newAddress } from '../../../../utils/address';

import { backgroundColor, styleMainMenu } from '../../../../constants';


interface Props {
  edittype: Edittype;
  onSubmit: (values: AddressNoID) => void;
  onCancel: () => void;
}

export const AddAddressForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const address: Address = useSelector((state: RootState) => state.address);
  const addressgroups: Addressgroup[] = useSelector((state: RootState) => state.addressgroups);

  const addressgroupOptions: Option[] = [];
  Object.values(addressgroups).forEach(element => {
    addressgroupOptions.push({
      value: element.groupname.name,
      label: element.groupname.name
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
            <SelectField
              label="Gruppe"
              name="group"
              prompt="Bitte Gruppe auswählen"
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

export default AddAddressForm;
