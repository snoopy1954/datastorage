import React from "react";
import { ErrorMessage, Field, FormikProps, FieldArray } from "formik";
import { Button } from "semantic-ui-react";
import { styleButton }from '../../../constants';

import { Network } from '../../../../../backend/src/types/network';

import { newNetwork } from '../../../utils/network/network';


type NetworkFieldArrayProps = {
  networks: Network[];
  setFieldValue: FormikProps<{ networks: Network[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ networks: Network[] }>["setFieldTouched"];
}

export const NetworkFieldArray: React.FC<NetworkFieldArrayProps> = ({
  networks,
  setFieldValue,
  setFieldTouched
}: NetworkFieldArrayProps) => {
  const field = "networks";

  return (
    <FieldArray name="networks">
      {({ remove }) => (
        <div>
          {networks.length > 0 &&
            networks.map((network, index) => (
              <div className="row" key={index}>
                <label htmlFor={`osversions.${index}.os`}>Netzwerk #{index+1}</label>
                <div className="col">
                  <Field
                    name={`networks.${index}.hostname`}
                    placeholder="Hostname"
                    type="text"
                  />
                  <ErrorMessage
                    name={`networks.${index}.hostname`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="col">
                  <Field
                    name={`networks.${index}.mac`}
                    placeholder="MAC"
                    type="text"
                  />
                  <ErrorMessage
                    name={`networks.${index}.mac`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="col">
                  <Field
                    name={`networks.${index}.ip`}
                    placeholder="IP"
                    type="text"
                  />
                  <ErrorMessage
                    name={`networks.${index}.ip`}
                    component="div"
                    className="field-error"
                  />
                </div>
                {index===networks.length-1&&<Button style={styleButton} onClick={() => {
                    networks.push(newNetwork());
                    setFieldTouched(field, true);
                    setFieldValue(field, networks);
                }} disabled={networks[networks.length-1].hostname===""}>Neu</Button>}
                <Button style={styleButton} onClick={() => remove(index)}>Löschen</Button>
              </div>
            ))}
        </div>
      )}
    </FieldArray>
  );
};

