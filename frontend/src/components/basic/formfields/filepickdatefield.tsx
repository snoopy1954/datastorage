import React from "react";
import { Field, FieldArray, FieldProps, FormikProps } from "formik";

import { FileDate } from '../../../types/axa';

import { FileField} from './filefield';
import { PickField} from './pickdatefield';

interface FileDateProps extends FieldProps {
    filedate: FileDate;
    name: string;
    label: string;
    setFieldValue: FormikProps<{}>["setFieldValue"];
    setFieldTouched: FormikProps<{}>["setFieldTouched"];
};

export const FilePickDateField: React.FC<FileDateProps> = ({
    field,
    filedate,
    name,
    label,
    setFieldValue,
    setFieldTouched
  }: FileDateProps) => {
    const fieldnamefile = field.name + '.file';
    const fieldnamedate = field.name + '.date';
    return (
      <FieldArray name="filedate">
        {() => (
          <div className="row">
            <div className="col">
            <Field
                name={fieldnamefile}
                label={label}
                filename={filedate.file}
                component={FileField}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
            />
            <Field
                name={fieldnamedate}
                label="Datum"
                date={filedate.date}
                component={PickField}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
            />
            </div> 
          </div>
        )}
      </FieldArray>
    )
  };
  
  