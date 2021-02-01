import React from "react";
import { Field, FormikProps, FieldArray } from "formik";
import { Button } from "semantic-ui-react";
import { styleButton }from '../../../../constants';


type Props = {
  subgroups: string[];
  setFieldValue: FormikProps<{ subgroups: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ subgroups: string[] }>["setFieldTouched"];
};

export const SubgroupsFieldArray: React.FC<Props> = ({ subgroups, setFieldValue, setFieldTouched }: Props) => {
  const field = "subgroups";

  return (
    <FieldArray name="subgroups">
      {({ remove }) => (
        <div>
          {subgroups.length > 0 &&
            subgroups.map((subgroup, index) => (
              <div className="row" key={index}>
                <label htmlFor={`subgroups.${index}`}>Version #{index+1}</label>
                <div className="col">
                  <Field
                    name={`subgroups.${index}`}
                    placeholder="Version"
                    type="text"
                  />
                </div>
                {index===subgroups.length-1&&<Button style={styleButton} onClick={() => {
                    subgroups.push('');
                    setFieldTouched(field, true);
                    setFieldValue(field, subgroups);
                }} disabled={subgroups[subgroups.length-1]===""}>Neu</Button>}
                <Button style={styleButton} onClick={() => remove(index)}>Löschen</Button>
              </div>
            ))}
        </div>
      )}
    </FieldArray>
  );
};

