import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Form } from "semantic-ui-react";

interface TextPropsCheck extends FieldProps {
  label: string;
  placeholder: string;
  setFieldValue: FormikProps<{ weight: string }>["setFieldValue"];
  errorMessage?: string;
}

export const TextFieldCheck: React.FC<TextPropsCheck> = ({ field, label, placeholder, setFieldValue }) => (
  <Form.Field>
    <label>{label}</label>
    <Field 
      placeholder={placeholder} 
      {...field} 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onBlur={(e: React.FocusEvent<any>) => {
        const value: string = e.target.value;
        const name: string = e.target.name;
        let stringValue: string;
        let intValue: number;
        switch (name) {
          case "weight":
            stringValue = value.replace(',','');
            intValue = +stringValue;
            if (isNaN(intValue)) stringValue = "";
            if (stringValue.length<2 || stringValue.length>3) stringValue = "";
            if (stringValue.length===2) stringValue += ",0";
            if (stringValue.length===3) stringValue = stringValue.substr(0,2) + "," + stringValue.substr(2);
            setFieldValue(name, stringValue);
            break;
          case "early.time":
          case "late.time":
            stringValue = value.replace(':','');
            intValue = +stringValue;
            if (isNaN(intValue)) stringValue = "";
            if (stringValue.length!==4) stringValue = "";
            if (stringValue.length===4) stringValue = stringValue.substr(0,2) + ":" + stringValue.substr(2);
            setFieldValue(name, stringValue);
            break;
          case "early.diastolic":
          case "early.systolic":
          case "early.pulse":
          case "late.diastolic":
          case "late.systolic":
          case "late.pulse":
            stringValue = value;
            intValue = +stringValue;
            if (isNaN(intValue)) stringValue = "";
            setFieldValue(name, stringValue);
            break;
          default:
        }
      }}
    />
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  errorMessage?: string;
}

export const TextField: React.FC<TextProps> = ({ field, label, placeholder, disabled }) => (
  <Form.Field>
    <label>{label}</label>
    <Field 
      placeholder={placeholder} 
      {...field} 
      disabled={disabled} 
    />
    
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface NumberProps extends FieldProps {
  label: string;
  placeholder: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
