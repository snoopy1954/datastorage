import React from "react";
import { Field, FieldProps, FormikProps } from "formik";
import { Form } from "semantic-ui-react";

import { Option } from '../../../types/basic';


interface Props extends FieldProps {
    label: string;
    placeholder: string;
    prompt: string;
    options: Option[];
    hasChanged: (selection: string) => void;
    setFieldValue: FormikProps<{  }>["setFieldValue"];
    setFieldTouched: FormikProps<{ }>["setFieldTouched"];
};

export const SelectFieldWithChange: React.FC<Props> = ({ field, label, prompt, options, hasChanged, setFieldValue, setFieldTouched }: Props) => {
  const onChange = (event: React.FormEvent<HTMLInputElement>): void  => {
    hasChanged(event.currentTarget.value);
    setFieldValue(field.name, event.currentTarget.value);
    setFieldTouched(field.name);
  };

  return (
  <Form.Field>
    <label>{label}</label>
    <Field 
      as="select" 
      name={field.name} 
      className="ui dropdown"
      onChange={( event: React.FormEvent<HTMLInputElement> ) => onChange(event)} 
    >
      <option disabled value="">{prompt}</option>
      {options.map(option => 
        <option key={option.value} value={option.value}>{option.label || option.value}</option>
      )}
    </Field>
  </Form.Field>
  )
};
