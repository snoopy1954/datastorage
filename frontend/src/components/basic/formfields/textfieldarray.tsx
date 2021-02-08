import React from "react";
import { Field, FormikProps, FieldProps, FieldArray } from "formik";
import { Button } from "semantic-ui-react";
import { styleButton }from '../../../constants';


interface Props extends FieldProps {
  items: string[];
  setFieldValue: FormikProps<{ items: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ items: string[] }>["setFieldTouched"];
};

export const TextFieldArray: React.FC<Props> = ({ field, items, setFieldValue, setFieldTouched }: Props) => {
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
              <div className="row" key={index}>
                <label>#{index+1}</label>
                <div className="col">
                  <Field
                    name={`${field.name}.${index}`} 
                    placeholder='Eingabe'
                    type="text"
                  />
                </div>
                <Button style={styleButton} onClick={() => remove(index)}>Löschen</Button>
                {index===items.length-1&&
                  <Button style={styleButton} onClick={() => onItemAdd()} disabled={items[items.length-1]===""}>Neu</Button>}
              </div>
          ))}
          {items.length===0&&<Button style={styleButton} onClick={() => onItemAdd()}>Neu</Button>}
        </div>
      )}
    </FieldArray>
  );
};

