import React from "react";
import { Field, FieldArray, FieldProps, FormikProps } from "formik";

import { FileDate } from '../../../types/axa';

import { FileField} from './filefield';
import { PickField} from './pickdatefield';

interface Props extends FieldProps {
    filedate: FileDate;
    label: string;
    setFieldValue: FormikProps<{}>["setFieldValue"];
    setFieldTouched: FormikProps<{}>["setFieldTouched"];
};

export const FilePickDateField: React.FC<Props> = ({
    field,
    filedate,
    label,
    setFieldValue,
    setFieldTouched
  }: Props) => {
    const fieldnamefile = field.name + '.file';
    const fieldnamedate = field.name + '.date';

    console.log(filedate)
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
  
  