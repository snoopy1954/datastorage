import React from "react";
import { Field, FormikProps, FieldArray } from "formik";
import { Button } from "semantic-ui-react";
import { styleButton }from '../../../constants';

import { Person } from '../../../../../backend/src/types/address';

import { newPerson } from '../../../utils/address/address';


type Props = {
  persons: Person[];
  setFieldValue: FormikProps<{ persons: Person[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ persons: Person[] }>["setFieldTouched"];
};

export const PersonFieldArray: React.FC<Props> = ({ persons, setFieldValue, setFieldTouched }: Props) => {
  const field = "persons";

  return (
    <FieldArray name="persons">
      {({ remove }) => (
        <div>
          {persons.length > 0 &&
            persons.map((person, index) => (
              <div className="row" key={index}>
                <label htmlFor={`persons.${index}.familyname`}>Person #{index+1}</label>
                <div className="col">
                  <Field
                    name={`persons.${index}.nickname`}
                    placeholder="Spitzname"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.givenname`}
                    placeholder="Vorname"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.familyname`}
                    placeholder="Familienname"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.birthday`}
                    placeholder="Geburtstag"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.communication.phone`}
                    placeholder="Festnetz"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.communication.mobile`}
                    placeholder="Handy"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.communication.email`}
                    placeholder="Email"
                    type="text"
                  />
                  <Field
                    name={`persons.${index}.communication.web`}
                    placeholder="Web"
                    type="text"
                  />
                 <Field
                    name={`persons.${index}.comment`}
                    placeholder="Kommentar"
                    type="text"
                  />
                </div>
                {index===persons.length-1&&<Button style={styleButton} onClick={() => {
                    persons.push(newPerson());
                    setFieldTouched(field, true);
                    setFieldValue(field, persons);
                }} disabled={persons[persons.length-1].nickname===""}>Neu</Button>}
                <Button style={styleButton} onClick={() => remove(index)}>Löschen</Button>
              </div>
            ))}
        </div>
      )}
    </FieldArray>
  );
};

