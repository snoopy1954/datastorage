import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";

import { Option } from "../../../types/basic";

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
        select={prompt}
      >
        <option disabled value="">{prompt}</option>
        {options.map(option => <option key={option.value} value={option.value}>{option.label || option.value}</option>)}
      </Field>
    </Form.Field>
    )
  };