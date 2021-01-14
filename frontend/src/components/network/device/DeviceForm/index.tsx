import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { DeviceNoID, Os } from '../../../../../../backend/src/types/network';
import { Option, Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { setSelectedVersions } from  '../../../../state/network/selectedversions/actions'; 

import { AppHeaderH3 } from "../../../basic/header";

import { TextField } from '../../../basic/formfields/textfield';
import { SelectField } from '../../../basic/formfields/selectfield';
import { NetworkFieldArray } from '../../../basic/formfields/networkfieldarray';
import { OsFieldArray } from '../../../basic/formfields/osfieldarray';

import { newDevice } from '../../../../utils/network/device';


interface Props {
  edittype: Edittype;
  onSubmit: (values: DeviceNoID) => void;
  onCancel: () => void;
}

export const DeviceForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
  const dispatch = useDispatch();

  const device = useSelector((state: RootState) => state.device);
  const devicetypes = useSelector((state: RootState) => state.devicetypes);
  const oss = useSelector((state: RootState) => state.oss);
  const selectedversions = useSelector((state: RootState) => state.versions);

  const handleOsSelection = (current: number, selection: string) => {
    const selectedOs: Os[] = Object.values(oss).filter((os => os.name === selection));
    const selectedversions: string[] = selectedOs.length===0 ? [] : selectedOs[0].versions;
    dispatch(setSelectedVersions(current, selectedversions));
  };

  const handleOsAdd = () => {
    dispatch(setSelectedVersions(selectedversions.length, []));
  };

  const devicetypeOptions: Option[] = [];
  Object.values(devicetypes).forEach(element => {
    devicetypeOptions.push({
      value: element.name,
      label: element.name
    })
  });

  const osoptions: Option[] = [];
  Object.values(oss).forEach(element => {
    osoptions.push({
      value: element.name,
      label: element.name
    })
  });

  const versionoptions: Option[][] = [];
  Object.values(selectedversions).forEach(element => {
    const versionoptionsOs: Option[] = [];
    element.versions.forEach((item) => {
       versionoptionsOs.push({
         value: item,
         label: item
       });
    });
    versionoptions.push(versionoptionsOs); 
  });
  if (versionoptions.length===0) {
    versionoptions.push([])
  }

  const initialValues = edittype===Edittype.EDIT && device.id!=='' ? device : newDevice();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.devicetype) {
          errors.devicetype = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Kommentar"
              placeholder="Kommentar"
              name="comment"
              component={TextField}
            />
            <Field
              label="Beschreibung"
              placeholder="Beschreibung"
              name="description"
              component={TextField}
            />
            <Field
              label="Gerätetyp"
              prompt="Gerätetyp auswählen"
              name="devicetype"
              component={SelectField}
              options={devicetypeOptions}
            />
            <NetworkFieldArray
              networks={values.networks}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <OsFieldArray
              osversions={values.osversions}
              osoptions={osoptions}
              versionoptions={versionoptions}
              osChange={handleOsSelection}
              osAdd={handleOsAdd}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <AppHeaderH3 text='Abschliessen' icon='question'/>
            <Button style={styleButton} type="submit" disabled={!dirty || !isValid}>Speichern</Button>
            <Button style={styleButton} onClick={() => onCancel()}>Abbrechen</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DeviceForm;
