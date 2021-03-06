import React from "react";
import { Field, FieldArray, FieldProps, FormikProps } from "formik";
import { Form, Button } from "semantic-ui-react";
import { styleButton }from '../../../../constants';

import { BillStatus, Insurancetype, FileDate } from '../../../../types/axa';
import { Details } from '../../../../../../backend/src/types/axa';
import { Option } from '../../../../types/basic';

import { newDetails } from '../../../../utils/axa/axa';


export type BillStatusOption = {
  value: BillStatus;
  label: string;
};

export type InsurancetypeOption = {
  value: Insurancetype;
  label: string;
};

type BillStatusSelectionFieldProps = {
  name: string;
  label: string;
  prompt: string;
  options: BillStatusOption[];
};

export const SelectField: React.FC<BillStatusSelectionFieldProps> = ({
  name,
  label,
  prompt,
  options
}: BillStatusSelectionFieldProps) => {

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

type InvoicingPartySelectionFieldProps = {
  name: string;
  label: string;
  prompt: string;
  options: Option[];
};

export const SelectFieldInvoicingParty: React.FC<InvoicingPartySelectionFieldProps> = ({
  name,
  label,
  prompt,
  options
}: InvoicingPartySelectionFieldProps) => {

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

interface FileProps extends FieldProps {
  files: File[];
  setFieldValue: FormikProps<{}>["setFieldValue"];
  setFieldTouched: FormikProps<{}>["setFieldTouched"];
}

export const FileField: React.FC<FileProps> = ({
  files,
  setFieldValue,
  setFieldTouched
}: FileProps) => {
  const field="files";

  return (
  <Form.Field>
    <label>Datei</label>
    <input 
      type="file" 
      onChange={async (event) => {
        const target = event.currentTarget;
        if (target.files && target.files.length > 0) {
          const file: File = target.files[0];
          files.push(file);
          setFieldValue(field, files);
          setFieldTouched(field);
        }
      }}
    />
  </Form.Field>
  )
};

interface FileDateProps extends FieldProps {
  filedates: FileDate[];
  name: string;
  label: string;
  setFieldValue: FormikProps<{}>["setFieldValue"];
  setFieldTouched: FormikProps<{}>["setFieldTouched"];
}

export const FileDateField: React.FC<FileDateProps> = ({
  filedates,
  name,
  label,
  setFieldValue,
  setFieldTouched
}: FileDateProps) => {
  const field="filedates";
  const index: number = label==='Quittung' ? 1 : 0;
  
  return (
    <FieldArray name="filedate">
      {() => (
        <div className="row">
          <div className="col">
            <Form.Field>
              <label>{label}</label>
              <input 
                type="file" 
                onChange={async (event) => {
                    const target = event.currentTarget;
                    const date = filedates[index].date;
                    if (target.files && target.files.length > 0) {
                        const file: File = target.files[0];
                        const newFiledate: FileDate = { file: file, date: date }
                        filedates[index] = newFiledate;
                        setFieldValue(field, filedates);
                        setFieldTouched(field);
                    }
                }}
              />
            </Form.Field>
          </div>
          <div className="col">
            <Form.Field>
              <input 
                type="text" 
                placeholder={filedates[index].date}
                onChange={async (event) => {
                    const target = event.currentTarget;
                    const file = filedates[index].file;
                    const newFiledate: FileDate = { file: file, date: target.value }
                    filedates[index] = newFiledate;
                    setFieldValue(field, filedates);
                    setFieldTouched(field);
                }}
              />
            </Form.Field>
          </div> 
        </div>
      )}
    </FieldArray>
  )
};

type DetailsFieldArrayProps = {
  details: Details[];
  options: InsurancetypeOption[];
  setFieldValue: FormikProps<{}>["setFieldValue"];
  setFieldTouched: FormikProps<{}>["setFieldTouched"];
}

export const DetailsFieldArray: React.FC<DetailsFieldArrayProps> = ({
  details,
  options,
  setFieldValue,
  setFieldTouched
}: DetailsFieldArrayProps) => {
  const field = "details";

  return (
    <FieldArray name="details">
      {({ remove }) => (
        <div>
          {details.length > 0 &&
            details.map((detail, index) => (
              <div className="row" key={index}>
                <label htmlFor={`detail.${index}.insurancetype`}>Teil #{index+1}</label>
                <div className="col">
                  <Field 
                    as="select" 
                    name={`details.${index}.insurancetype`}
                    className="ui dropdown"
                    // select={prompt}
                  >
                    <option disabled value="">{prompt}</option>
                    {options.map(option => <option key={option.value} value={option.value}>{option.label || option.value}</option>)}
                  </Field>
                  <Field
                    name={`details.${index}.year`}
                    placeholder="Jahr"
                    type="text"
                  />
                  <Field
                    name={`details.${index}.amount`}
                    placeholder="Betrag"
                    type="text"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onBlur={(e: React.FocusEvent<any>) => {
                      const name=`details.${index}.amount`;
                      let value: string = e.target.value;
                      const stringValue: string = value.replace(',','');
                      const intValue = +stringValue;
                      if (isNaN(intValue)) value = "";
                      if (value.includes(',')) {
                        const cents = value.substr(value.indexOf(',')+1,value.length-1);
                        switch (cents.length) {
                          case 0: 
                            value = value + '00';
                            break;
                          case 1:
                            value = value + '0';
                            break;
                          default:
                        }
                      } else {
                        value = value + ',00';
                      }
                      setFieldValue(name, value);
                    }}              
                  />
                </div>

                {index===details.length-1&&
                  <Button style={styleButton} onClick={() => {
                    details.push(newDetails());
                    setFieldTouched(field, true);
                    setFieldValue(field, details);
                  }} disabled={details[details.length-1].amount===''}>Neu</Button>}
                <Button style={styleButton} onClick={() => remove(index)}>Löschen</Button>
              </div>
            ))}
        </div>
      )}
    </FieldArray>
  );
};

