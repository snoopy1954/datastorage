import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Form } from "semantic-ui-react";

interface Props extends FieldProps {
    label: string;
    placeholder: string;
    errorMessage?: string;
    min: number;
    max: number;
};
  
export const NumberField: React.FC<Props> = ({ field, label, min, max }) => (
    <Form.Field>
      <label>{label}</label>
      <Field {...field} type='number' min={min} max={max} />
      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
);
  
  