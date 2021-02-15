import React from "react";
import { Field, FormikProps, FieldProps, FieldArray } from "formik";
import { Button, Form } from "semantic-ui-react";
import { styleButton }from '../../../constants';


const leftStyle = {
  width: '49%',
  float: 'left'

}

interface Props extends FieldProps {
  label: string;
  items: string[];
  setFieldValue: FormikProps<{ items: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ items: string[] }>["setFieldTouched"];
};

export const TextFieldArray: React.FC<Props> = ({ field, label, items, setFieldValue, setFieldTouched }: Props) => {
  const onItemAdd = (): void => {
    items.push('');
    setFieldValue(field.name, items);
    setFieldTouched(field.name, true);
  };

  return (    
    <FieldArray name={field.name}>
      {({ remove }) => (
        <div>
          {items.length > 0 && items.map((item, index) => (
              <div key={index}>
                  <Form.Field>
                    <label>{label} #{index+1}</label>
                    <Field
                      name={`${field.name}.${index}`} 
                      placeholder='Eingabe'
                      type="text"
                      style={leftStyle}
                    />
                    <Button style={styleButton} onClick={() => remove(index)}>Löschen</Button>
                  </Form.Field>
                {index===items.length-1&&
                  <Button style={styleButton} onClick={() => onItemAdd()} disabled={items[items.length-1]===""}>Neu</Button>}
              </div>
          ))}
          {items.length===0&&<p>keine</p>}
          {items.length===0&&<Button style={styleButton} onClick={() => onItemAdd()}>Neu</Button>}
        </div>
      )}
    </FieldArray>
  );
};

