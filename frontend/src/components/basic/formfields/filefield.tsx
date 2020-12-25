import React from "react";
import { FieldProps, FormikProps } from "formik";
import { Form } from "semantic-ui-react";

interface FileProps extends FieldProps {
    file: File;
    label: string;
    setFieldValue: FormikProps<{}>["setFieldValue"];
    setFieldTouched: FormikProps<{}>["setFieldTouched"];
};
  
export const FileField: React.FC<FileProps> = ({
    field,
    file,
    label,
    setFieldValue,
    setFieldTouched
  }: FileProps) => {
  
  return (
    <Form.Field>
      <label>{label}</label>
      <input 
        type="file" 
        onChange={async (event) => {
          const target = event.currentTarget;
          if (target.files && target.files.length > 0) {
            const file: File = target.files[0];
            setFieldValue(field.name, file);
            setFieldTouched(field.name);
          }
        }}
      />
    </Form.Field>
  )
};
  