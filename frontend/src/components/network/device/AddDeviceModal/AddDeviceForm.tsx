import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Menu } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Device, Os } from '../../../../../../backend/src/types/network';
import { Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { setSelectedVersions } from  '../../../../state/network/selectedversions/actions'; 

import { AppHeaderH3 } from "../../../basic/header";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { TextField, SelectField, Option, NetworkFieldArray, OsFieldArray } from "./FormField";

export type DeviceFormValues = Omit<Device, "id">;

interface Props {
  edittype: Edittype;
  onSubmit: (values: DeviceFormValues) => void;
  onCancel: () => void;
}

const AddDeviceForm: React.FC<Props> = ({ edittype, onSubmit, onCancel }) => {
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

  const initialValues = edittype===Edittype.EDIT && device.id!==''
  ? {
      name: device.name,
      description: device.description,
      devicetype: device.devicetype,
      networks: device.networks,
      osversions: device.osversions,
      comment: device.comment,
      createdAt: device.createdAt,
      modifiedAt: new Date()
    }
  : {
      name: "",
      description: "",
      devicetype: "",
      networks: [{
        hostname: "",
        mac: "",
        ip: ""
      }],
      osversions: [{
        name: "",
        supplement: "",
        version: ""
      }],
      comment: "",
      createdAt: new Date(),
      modifiedAt: new Date()
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
            <SelectField
              label="Gerätetyp"
              name="devicetype"
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
            <AppHeaderH3 text='Abschliessen'/>
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

export default AddDeviceForm;
