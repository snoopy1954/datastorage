import React from "react";
import { ErrorMessage, Field, FormikProps, FieldArray } from "formik";
import { Button } from "semantic-ui-react";
import { styleButton }from '../../../constants';

import { Osversion } from '../../../../../backend/src/types/network';
import { Option } from "../../../types/basic";


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
    osversions[current] = { 
      ...osversions[current], 
      version: event.currentTarget.value 
    };
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
                {index===osversions.length-1&&
                  <Button style={styleButton} onClick={() => onOsAdd()} disabled={osversions[osversions.length-1].name===""}>Neu</Button>}
                <Button style={styleButton} onClick={() => remove(index)}>Löschen</Button>
              </div>
            ))}
        </div>
      )}
    </FieldArray>
  );
};

