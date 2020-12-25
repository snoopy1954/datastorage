import React from "react";
import { Field, FieldProps } from "formik";
import { Form } from "semantic-ui-react";

interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
};

export const ShowField: React.FC<TextProps> = ({ field, label, placeholder }) => (
    <Form.Field>
      <label>{label}</label>
      <Field value={placeholder} />
    </Form.Field>
);
  