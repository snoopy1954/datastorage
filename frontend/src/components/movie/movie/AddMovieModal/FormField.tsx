import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Form } from "semantic-ui-react";

import { getMD5 } from '../../../../utils/movie';

export type Option = {
  value: string;
  label: string;
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

type SelectionFieldProps = {
  name: string;
  label: string;
  prompt: string;
  options: Option[];
};

export const SelectField: React.FC<SelectionFieldProps> = ({
  name,
  label,
  prompt,
  options
}: SelectionFieldProps) => {
  return (
  <Form.Field>
    <label>{label}</label>
    <Field 
      as="select" 
      name={name} 
      className="ui dropdown"
      // select={prompt}
    >
      <option disabled value="">{prompt}</option>
      {options.map(option => <option key={option.value} value={option.value}>{option.label || option.value}</option>)}
    </Field>
  </Form.Field>
  )
};

type SelectionWithChangeFieldProps = {
  name: string;
  label: string;
  prompt: string;
  options: Option[];
  hasChanged: (selection: string) => void;
  setFieldValue: FormikProps<{  }>["setFieldValue"];
  setFieldTouched: FormikProps<{ }>["setFieldTouched"];
};

export const SelectFieldWithChange: React.FC<SelectionWithChangeFieldProps> = ({
  name,
  label,
  prompt,
  options,
  hasChanged,
  setFieldValue,
  setFieldTouched
}: SelectionWithChangeFieldProps) => {

  const onChange = (event: React.FormEvent<HTMLInputElement>): void  => {
    hasChanged(event.currentTarget.value);
    setFieldValue('moviegroup', event.currentTarget.value);
    setFieldTouched('moviegroup');
  };

  return (
  <Form.Field>
    <label>{label}</label>
    <Field 
      as="select" 
      name={name} 
      className="ui dropdown"
      onChange={( event: React.FormEvent<HTMLInputElement> ) => onChange(event)} 
    >
      <option disabled value="">{prompt}</option>
      {options.map(option => <option key={option.value} value={option.value}>{option.label || option.value}</option>)}
    </Field>
  </Form.Field>
  )
};

interface FileProps extends FieldProps {
  setFieldValue: FormikProps<{  }>["setFieldValue"];
  setFieldTouched: FormikProps<{ }>["setFieldTouched"];
}

export const FileField: React.FC<FileProps> = ({
  field,
  setFieldValue,
  setFieldTouched
}: FileProps) => {
  return (
  <Form.Field>
    <label>Datei</label>
    <input 
      type="file" 
      name={field.name} 
      onChange={async (event) => {
        const target = event.currentTarget;
        if (target.files && target.files.length > 0) {
          const file: File = target.files[0];
          const fileChunk = file.slice(0, 2048, "application/experimental");
          const arraybuffer: ArrayBuffer = await new Response(fileChunk).arrayBuffer();
          const uint8array = new Uint8Array(arraybuffer);
          const text: string = (uint8array.toString());
          const checksum = getMD5(text);
          const filename = file.name;
          setFieldValue("filename", filename);
          setFieldTouched("filename");
          setFieldValue("checksum", checksum);
          setFieldTouched("checksum");
        }
      }}
    />
  </Form.Field>
  )
};

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

