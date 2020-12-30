import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps, FieldArray } from "formik";
import { Form, Button, Menu } from "semantic-ui-react";

import { Person } from '../../../../../../backend/src/types/address';
import { backgroundColor, styleMainMenu } from "../../../../constants";
import { newPerson } from '../../../../utils/address';


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
  prompt: string;
  options: Option[];
};

export const SelectField: React.FC<SelectionFieldProps> = ({
  name,
  label,
  prompt,
  options
}: SelectionFieldProps) => {
  return (
  <Form.Field>
    <label>{label}</label>
    <Field 
      as="select" 
      name={name} 
      className="ui dropdown"
      // select={prompt}
    >
      <option disabled value="">{prompt}</option>
      {options.map(option => <option key={option.value} value={option.value}>{option.label || option.value}</option>)}
    </Field>
  </Form.Field>
  )
};

type SelectionWithChangeFieldProps = {
  name: string;
  label: string;
  prompt: string;
  options: Option[];
  hasChanged: (selection: string) => void;
  setFieldValue: FormikProps<{  }>["setFieldValue"];
  setFieldTouched: FormikProps<{ }>["setFieldTouched"];
};

export const SelectFieldWithChange: React.FC<SelectionWithChangeFieldProps> = ({
  name,
  label,
  prompt,
  options,
  hasChanged,
  setFieldValue,
  setFieldTouched
}: SelectionWithChangeFieldProps) => {

  const onChange = (event: React.FormEvent<HTMLInputElement>): void  => {
    hasChanged(event.currentTarget.value);
    setFieldValue('bookgroup', event.currentTarget.value);
    setFieldTouched('bookgroup');
  };

  return (
  <Form.Field>
    <label>{label}</label>
    <Field 
      as="select" 
      name={name} 
      className="ui dropdown"
      onChange={( event: React.FormEvent<HTMLInputElement> ) => onChange(event)} 
    >
      <option disabled value="">{prompt}</option>
      {options.map(option => <option key={option.value} value={option.value}>{option.label || option.value}</option>)}
    </Field>
  </Form.Field>
  )
};

interface FileProps extends FieldProps {
  setFieldValue: FormikProps<{  }>["setFieldValue"];
  setFieldTouched: FormikProps<{ }>["setFieldTouched"];
}

export const FileField: React.FC<FileProps> = ({
  field,
  setFieldValue,
  setFieldTouched
}: FileProps) => {
  return (
  <Form.Field>
    <label>Datei</label>
    <input 
      type="file" 
      name={field.name} 
      onChange={async (event) => {
        const target = event.currentTarget;
        if (target.files && target.files.length > 0) {
          const file: File = target.files[0];
          setFieldValue("file", file);
          setFieldTouched("file");
        }
      }}
    />
  </Form.Field>
  )
};

interface NumberProps extends FieldProps {
  label: string;
  placeholder: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

type PersonFieldArrayProps = {
  persons: Person[];
  setFieldValue: FormikProps<{ persons: Person[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ persons: Person[] }>["setFieldTouched"];
}

export const PersonFieldArray: React.FC<PersonFieldArrayProps> = ({
  persons,
  setFieldValue,
  setFieldTouched
}: PersonFieldArrayProps) => {
  const field = "persons";

  return (
    <FieldArray name="persons">
      {({ remove }) => (
        <div>
          {persons.length > 0 &&
            persons.map((person, index) => (
              <div className="row" key={index}>
                <label htmlFor={`persons.${index}.name.name`}>Person #{index+1}</label>
                <div className="col">
                  <Field
                    name={`persons.${index}.nickname`}
                    placeholder="Spitzname"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.givenname`}
                    placeholder="Vorname"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.familyname`}
                    placeholder="Familienname"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.birthday`}
                    placeholder="Geburtstag"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.communication.phone`}
                    placeholder="Festnetz"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.communication.mobile`}
                    placeholder="Handy"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.communication.email`}
                    placeholder="Email"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.communication.web`}
                    placeholder="Web"
                    type="text"
                  />
                 <Field
                    name={`persons.${index}.comment`}
                    placeholder="Kommentar"
                    type="text"
                  />
                </div>
                <Menu compact stackable borderless style={{ background: backgroundColor }}>
                  {index===persons.length-1&&
                  <Menu.Item>
                    <Button style={styleMainMenu} color="blue" type="button" onClick={() => {
                        persons.push(newPerson());
                        setFieldTouched(field, true);
                        setFieldValue(field, persons);
                      }} disabled={persons[persons.length-1].nickname===""}>Neu</Button>
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

