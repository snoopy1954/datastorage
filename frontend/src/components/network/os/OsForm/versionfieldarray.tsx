import React from "react";
import { Field, FormikProps, FieldArray } from "formik";
import { Button } from "semantic-ui-react";
import { styleButton }from '../../../../constants';


type Props = {
  versions: string[];
  setFieldValue: FormikProps<{ persons: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ persons: string[] }>["setFieldTouched"];
};

export const VersionFieldArray: React.FC<Props> = ({ versions, setFieldValue, setFieldTouched }: Props) => {
  const field = "persons";

  return (
    <FieldArray name="versions">
      {({ remove }) => (
        <div>
          {versions.length > 0 &&
            versions.map((person, index) => (
              <div className="row" key={index}>
                <label htmlFor={`persons.${index}`}>Version #{index+1}</label>
                <div className="col">
                  <Field
                    name={`versions.${index}`}
                    placeholder="Version"
                    type="text"
                  />
                </div>
                {index===versions.length-1&&<Button style={styleButton} onClick={() => {
                    versions.push('');
                    setFieldTouched(field, true);
                    setFieldValue(field, versions);
                }} disabled={versions[versions.length-1]===""}>Neu</Button>}
                <Button style={styleButton} onClick={() => remove(index)}>Löschen</Button>
              </div>
            ))}
        </div>
      )}
    </FieldArray>
  );
};

