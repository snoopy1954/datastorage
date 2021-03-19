import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { styleButton }from '../../../../constants';

import { Device, DeviceNoID, Os } from '../../../../../../backend/src/types/network';
import { Option, Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from "../../../basic/header";

import { TextField } from '../../../basic/formfields/textfield';
import { SelectField } from '../../../basic/formfields/selectfield';
import { NetworkFieldArray } from '../../../basic/formfields/networkfieldarray';
import { OsFieldArray } from '../../../basic/formfields/osfieldarray';

import { newDevice } from '../../../../utils/network/device';


interface Props {
  edittype: Edittype;
  device: Device;
  onSubmit: (values: DeviceNoID) => void;
  onCancel: () => void;
}

export const DeviceForm: React.FC<Props> = ({ edittype, device, onSubmit, onCancel }) => {
  const [versions, setVersions] = React.useState<Array<string[]>>([]);

  const devicetypes = useSelector((state: RootState) => state.devicetypes);
  const oss = useSelector((state: RootState) => state.oss);

  React.useEffect(() => {
    const newVersions: string[][] = new Array([]);
    const fetchVersions = () => {
    device.osversions.forEach((osversion, index) => {
      const selectedOs: Os[] = Object.values(oss).filter((os => os.name === osversion.name));
      const selectedversions: string[] = selectedOs.length===0 ? [] : selectedOs[0].versions;
      newVersions[index] = selectedversions;
    });    
    }
    fetchVersions();
    setVersions(newVersions);
  }, [device, oss, setVersions]);  

  const handleOsSelection = (current: number, selection: string) => {
    const newVersions: string[][] = versions.map(version=>version);
    const selectedOs: Os[] = Object.values(oss).filter((os => os.name === selection));
    const selectedversions: string[] = selectedOs.length===0 ? [] : selectedOs[0].versions;
    newVersions[current] = selectedversions;
    setVersions(newVersions);
  };

  const handleOsAdd = () => {
    const newVersions: string[][] = versions.map(version=>version);
    const newVersion: string[] = [];
    newVersions.push(newVersion);
    setVersions(newVersions);
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
  (versions).forEach(element => {
    const versionoptionsOs: Option[] = [];
    element.forEach((item) => {
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
  if (edittype===Edittype.EDIT && device.id!=='' && versions.length===0) {
    return (
      <div>
        <p>Bitte warten</p>
      </div>
    )
  }
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
