import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Form } from "semantic-ui-react";

import { AccountStatus } from '../../../../types/axa';

export type AccountStatusOption = {
  value: AccountStatus;
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
  options: AccountStatusOption[];
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

