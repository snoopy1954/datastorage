import React from "react";
import { FieldProps, FormikProps } from "formik";
import { Form } from "semantic-ui-react";

import { getMD5 } from '../../../utils/basic/basic';


interface Props extends FieldProps {
  setFieldValue: FormikProps<{  }>["setFieldValue"];
  setFieldTouched: FormikProps<{ }>["setFieldTouched"];
}

export const FileFieldWithChecksum: React.FC<Props> = ({ field, setFieldValue, setFieldTouched }: Props) => {
    const onChange = async (event: React.FormEvent<HTMLInputElement>): Promise<void>  => {
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
    };
    
    return (
        <Form.Field>
            <label>Datei</label>
            <input 
                type="file" 
                onChange={( event: React.FormEvent<HTMLInputElement> ) => onChange(event)} 
            />
        </Form.Field>
    )
};
