import React from "react";
import { FieldProps, FormikProps, Field } from "formik";
import { Form, Button } from "semantic-ui-react";
import { styleButton }from '../../../constants';
import { ContentWithFile } from '../../../types/basic';
import { PickField } from './pickdatefield';
import { TextField } from './textfield';

interface Props extends FieldProps {
    label: string;
    content: ContentWithFile;
    removeitem: (label: string) => void;
    changeitem: (label: string) => void;
    setFieldValue: FormikProps<{}>["setFieldValue"];
    setFieldTouched: FormikProps<{}>["setFieldTouched"];
};

const leftStyle = {
    width: '72%',
    float: 'left'  
};  
  
export const ContentField: React.FC<Props> = ({ field, label, content, removeitem, changeitem, setFieldValue, setFieldTouched }: Props) => {
    const onChange = (event: React.FormEvent<HTMLInputElement>): void  => {
        const target = event.currentTarget;
        if (target.files && target.files.length > 0) {
            const file: File = target.files[0];
            setFieldValue(field.name + '.file', file);
            setFieldTouched(field.name + '.file');
        }
    };

    const removeAction = (label: string) => {
        removeitem(label);
    };

    const changeAction = (label: string) => {
        changeitem(label);
    };

    if (content.filename!=='') {
        return (
            <Form.Field>
                <label>{label}</label>
                <Field value={content.filename} style={leftStyle}/>
                <Button type='button' style={styleButton} onClick={() => changeAction(label)}>Ändern</Button>
                <Button type='button' style={styleButton} onClick={() => removeAction(label)}>Löschen</Button>
            </Form.Field>
        )    
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
  