import React from "react";
import { FieldProps, Field } from "formik";
import { Form, Button } from "semantic-ui-react";
import { styleButton }from '../../../constants';

interface Props extends FieldProps {
  removeitem: (label: string) => void;
  label: string;
  placeholder: string;
};

const leftStyle = {
  width: '85%',
  float: 'left'  
};
  
export const TextFieldWithDelete: React.FC<Props> = ({ field, removeitem, label, placeholder }) => {
  const removeAction = (label: string) => {
    removeitem(label);
  }

  return (
    <Form.Field>
      <label>{label}</label>
      <Field  
        {...field}
        placeholder={placeholder}
        style={leftStyle}
      />
      <Button type='button' style={styleButton} onClick={() => removeAction(label)}>Löschen</Button>
    </Form.Field>
  );
};
  