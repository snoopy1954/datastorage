import React from "react";
import { ErrorMessage, FieldProps, Field } from "formik";
import { Form } from "semantic-ui-react";

interface Props extends FieldProps {
    label: string;
    placeholder: string;
};
  
export const BooleanField: React.FC<Props> = ({ field, label, placeholder }) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} type='boolean' {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
  