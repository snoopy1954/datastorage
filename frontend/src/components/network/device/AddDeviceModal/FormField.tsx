import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps, FieldArray } from "formik";
import { Form, Button, Menu } from "semantic-ui-react";
import { Network, Osversion } from "../../../../types/network";
import { backgroundColor, styleMainMenu } from "../../../../constants";

export type Option = {
  value: string;
  label: string;
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

type SelectionFieldProps = {
  name: string;
  label: string;
  options: Option[];
};

export const SelectField: React.FC<SelectionFieldProps> = ({
  name,
  label,
  options
}: SelectionFieldProps) => {
  return (
  <Form.Field>
    <label>{label}</label>
    <Field 
      as="select" 
      name={name} 
      className="ui dropdown"
      select="Bitte Gerätetyp auswählen"
    >
      <option disabled value="">Bitte Gerätetyp auswählen</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
  );
};

type OsFieldArrayProps = {
  osversions: Osversion[];
  osoptions: Option[];
  versionoptions: Option[][];
  osChange: (current: number, selection: string) => void;
  osAdd: () => void;
  setFieldValue: FormikProps<{ osversions: Osversion[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ osversions: Osversion[] }>["setFieldTouched"];
}

export const OsFieldArray: React.FC<OsFieldArrayProps> = ({
  osversions,
  osoptions,
  versionoptions,
  osChange,
  osAdd,
  setFieldValue,
  setFieldTouched
}: OsFieldArrayProps) => {
  const field = "osversions";

  const onOsChange = (event: React.FormEvent<HTMLInputElement>, current: number): void  => {
    const currentVersion = osversions[current].version
    osversions[current] = { name: event.currentTarget.value, supplement: "", version: currentVersion };
    setFieldValue(field, osversions);
    osChange(current, event.currentTarget.value);
  };

  const onVersionChange = (event: React.FormEvent<HTMLInputElement>, current: number): void  => {
    const currentName = osversions[current].name;
    osversions[current] = { name: currentName, supplement: "", version: event.currentTarget.value };
    setFieldValue(field, osversions);
  };

  const onOsAdd = (): void => {
    osversions.push({ name: "", supplement: "", version: "" })
    setFieldTouched(field, true);
    setFieldValue(field, osversions);
    osAdd();
  }
  
  return (
    <FieldArray name="osversions">
      {({ remove }) => (
        <div>
          {osversions.length > 0 &&
            osversions.map((osversion, index) => (
              <div className="row" key={index}>
                <label htmlFor={`osversions.${index}.os`}>Betriebssystem #{index+1}</label>
                <div className="col">
                  <Field 
                    as="select" 
                    name={`osversions.${index}.name`} 
                    className="ui dropdown" 
                    onChange={( event: React.FormEvent<HTMLInputElement> ) => onOsChange(event, index)} 
                    select="Bitte Betriebssystem auswählen"
                  >
                    <option disabled value="">Bitte Betriebssystem auswählen</option>
                    {osoptions.map(option => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name={`osversions.${index}.os`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="col">
                  <Field placeholder="Supplement" name={`osversions.${index}.supplement`} type="text"/>
                  <ErrorMessage name={`osversions.${index}.supplement`} />
                </div>
                <div className="col">
                  <Field 
                    as="select" 
                    name={`osversions.${index}.version`} 
                    className="ui dropdown" 
                    onChange={( event: React.FormEvent<HTMLInputElement> ) => onVersionChange(event, index)} 
                    select="Bitte Version auswählen"
                  >
                    <option disabled value="">Bitte Version auswählen</option>
                    {versionoptions[index].map(option => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name={`osversions.${index}.version`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <Menu compact stackable borderless style={{ background: backgroundColor }}>
                  {index===osversions.length-1&&
                  <Menu.Item>
                    <Button style={styleMainMenu} color="blue" type="button" onClick={() => onOsAdd()} disabled={osversions[osversions.length-1].name===""}>Neu</Button>
                  </Menu.Item>}
                  <Menu.Item>
                    <Button style={styleMainMenu} color="red" type="button" onClick={() => remove(index)}>Löschen</Button>
                  </Menu.Item>
                </Menu>
              </div>
            ))}
        </div>
      )}
    </FieldArray>
  );
};

type NetworkFieldArrayProps = {
  networks: Network[];
  setFieldValue: FormikProps<{ networks: Network[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ networks: Network[] }>["setFieldTouched"];
}

export const NetworkFieldArray: React.FC<NetworkFieldArrayProps> = ({
  networks,
  setFieldValue,
  setFieldTouched
}: NetworkFieldArrayProps) => {
  const field = "networks";

  return (
    <FieldArray name="networks">
      {({ remove }) => (
        <div>
          {networks.length > 0 &&
            networks.map((network, index) => (
              <div className="row" key={index}>
                <label htmlFor={`osversions.${index}.os`}>Netzwerk #{index+1}</label>
                <div className="col">
                  <Field
                    name={`networks.${index}.hostname`}
                    placeholder="Hostname"
                    type="text"
                  />
                  <ErrorMessage
                    name={`networks.${index}.hostname`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="col">
                  <Field
                    name={`networks.${index}.mac`}
                    placeholder="MAC"
                    type="text"
                  />
                  <ErrorMessage
                    name={`networks.${index}.mac`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="col">
                  <Field
                    name={`networks.${index}.ip`}
                    placeholder="IP"
                    type="text"
                  />
                  <ErrorMessage
                    name={`networks.${index}.ip`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <Menu compact stackable borderless style={{ background: backgroundColor }}>
                  {index===networks.length-1&&
                  <Menu.Item>
                    <Button style={styleMainMenu} color="blue" type="button" onClick={() => {
                        networks.push({ hostname: "", mac: "", ip: "" })
                        setFieldTouched(field, true);
                        setFieldValue(field, networks);
                      }} disabled={networks[networks.length-1].hostname===""}>Neu</Button>
                  </Menu.Item>}
                  <Menu.Item>
                    <Button style={styleMainMenu} color="red" type="button" onClick={() => remove(index)}>Löschen</Button>
                  </Menu.Item>
                </Menu>
              </div>
            ))}
        </div>
      )}
    </FieldArray>
  );
};

