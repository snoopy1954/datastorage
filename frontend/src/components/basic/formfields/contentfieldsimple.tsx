import React from "react";
import { FieldProps, FormikProps, Field } from "formik";
import { Form } from "semantic-ui-react";
import { ContentWithFile } from '../../../types/basic';
import { PickField } from './pickdatefield';
import { TextField } from './textfield';


interface Props extends FieldProps {
    label: string;
    content: ContentWithFile;
    setFieldValue: FormikProps<{}>["setFieldValue"];
    setFieldTouched: FormikProps<{}>["setFieldTouched"];
};
  
export const ContentFieldSimple: React.FC<Props> = ({ field, label, content, setFieldValue, setFieldTouched }: Props) => {
    const onChange = (event: React.FormEvent<HTMLInputElement>): void  => {
        const target = event.currentTarget;
        if (target.files && target.files.length > 0) {
            const file: File = target.files[0];
            setFieldValue(field.name + '.file', file);
            setFieldTouched(field.name + '.file');
        }
    };
    
    return (
        <Form.Field>
            <label>{label}</label>
            <input 
                type="file" 
                onChange={( event: React.FormEvent<HTMLInputElement> ) => onChange(event)} 
            />
            <Field
                label="Beschreibung"
                placeholder="Beschreibung"
                name={field.name + '.description'}
                component={TextField}
            />
            <Field
                name={field.name + '.date'}
                label="Datum"
                date={content.date}
                component={PickField}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
            />
        </Form.Field>
    )
};
  