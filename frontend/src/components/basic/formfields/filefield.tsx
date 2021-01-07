import React from "react";
import { FieldProps, FormikProps } from "formik";
import { Form } from "semantic-ui-react";

interface Props extends FieldProps {
    label: string;
    setFieldValue: FormikProps<{}>["setFieldValue"];
    setFieldTouched: FormikProps<{}>["setFieldTouched"];
};
  
export const FileField: React.FC<Props> = ({ field, label, setFieldValue, setFieldTouched }: Props) => {
    const onChange = (event: React.FormEvent<HTMLInputElement>): void  => {
        const target = event.currentTarget;
        if (target.files && target.files.length > 0) {
            const file: File = target.files[0];
            setFieldValue(field.name, file);
            setFieldTouched(field.name);
        }
    };

    return (
        <Form.Field>
            <label>{label}</label>
            <input 
                type="file" 
                onChange={( event: React.FormEvent<HTMLInputElement> ) => onChange(event)} 
            />
        </Form.Field>
    )
};
  