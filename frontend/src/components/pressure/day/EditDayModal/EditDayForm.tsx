import React from "react";
import { useSelector } from 'react-redux';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { RootState } from '../../../../state2/store';

import { TextField, TextFieldCheck } from "./FormField";
import { Day } from "../../../../types/pressure";

interface Props {
    onSubmit: (values: Day) => void;
    onCancel: () => void;
}

export const EditDayForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const day = useSelector((state: RootState) => state.selectedday);

    const initialValues: Day = day
    ? {
        date: day.date,
        weight: day.weight,
        early: {
          time: day.early.time,
          systolic: day.early.systolic,
          diastolic: day.early.diastolic,
          pulse: day.early.pulse
        },
        late: {
          time: day.late.time,
          systolic: day.late.systolic,
          diastolic: day.late.diastolic,
          pulse: day.late.pulse
        }
      }
    : {
        date: "",
        weight: "",
        early: {
          time: "",
          systolic: "",
          diastolic: "",
          pulse: ""
        },
        late: {
          time: "",
          systolic: "",
          diastolic: "",
          pulse: ""
        }                                                   
    }

   return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={values => {
              const errors: { [field: string]: string } = {};
              return errors;
            }}
        >
    
        {({ isValid, dirty, setFieldValue }) => {
            return (
                <Form className="form ui">
                   <Field
                        label="Datum"
                        placeholder="Datum"
                        disabled={true}
                        name="date"
                        component={TextField}
                    />
                   <Field
                        label="Gewicht"
                        placeholder="Gewicht"
                        name="weight"
                        setFieldValue={setFieldValue}
                        component={TextFieldCheck}
                    />
                    <h4>Frühmessung</h4>
                    <Field
                        label="Uhrzeit"
                        placeholder="Uhrzeit"
                        name="early.time"
                        setFieldValue={setFieldValue}
                        component={TextFieldCheck}
                    />
                    <Field
                        label="Systolisch"
                        placeholder="Sysstolisch"
                        name="early.systolic"
                        setFieldValue={setFieldValue}
                        component={TextFieldCheck}
                    />
                     <Field
                        label="Diastolisch"
                        placeholder="Diastolisch"
                        name="early.diastolic"
                        setFieldValue={setFieldValue}
                        component={TextFieldCheck}
                    />
                   <Field
                        label="Puls"
                        placeholder="Puls"
                        name="early.pulse"
                        setFieldValue={setFieldValue}
                        component={TextFieldCheck}
                    />
                    <h4>Spätmessung</h4>
                    <Field
                        label="Uhrzeit"
                        placeholder="Uhrzeit"
                        name="late.time"
                        setFieldValue={setFieldValue}
                        component={TextFieldCheck}
                    />
                    <Field
                        label="Systolisch"
                        placeholder="Sysstolisch"
                        name="late.systolic"
                        setFieldValue={setFieldValue}
                        component={TextFieldCheck}
                    />
                    <Field
                        label="Diastolisch"
                        placeholder="Diastolisch"
                        name="late.diastolic"
                        setFieldValue={setFieldValue}
                        component={TextFieldCheck}
                    />
                    <Field
                        label="Puls"
                        placeholder="Puls"
                        name="late.pulse"
                        setFieldValue={setFieldValue}
                        component={TextFieldCheck}
                    />

                    <Grid>
                        <Grid.Column width={5}>
                            <Button type="button" onClick={onCancel} color="red">
                                Abbrechen
                            </Button>
                            <Button type="submit" color="green" disabled={!dirty || !isValid}>
                                Speichern
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Form>
            );
        }}
        </Formik>
    );
};

export default EditDayForm;
