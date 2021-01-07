import React from "react";
import { Field, FieldProps } from "formik";
import { Form } from "semantic-ui-react";

import { Option } from "../../../types/basic";


interface Props extends FieldProps {
  label: string;
  placeholder: string;
  prompt: string;
  options: Option[];
};
  
export const SelectField: React.FC<Props> = ({ field, label, prompt, options }: Props) => {
    return (
        <Form.Field>
            <label>{label}</label>
            <Field 
                as="select" 
                name={field.name} 
                className="ui dropdown"
                select={prompt}
            >
                <option disabled value="">{prompt}</option>
                {options.map(option => <option key={option.value} value={option.value}>{option.label || option.value}</option>)}
            </Field>
        </Form.Field>
    )
};