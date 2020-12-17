import React, { FC } from 'react';
import { useFormikContext } from 'formik';

import ImageInputList from '../ImageInputList';
import ErrorMessage from './ErrorMessage';

interface FormImagePickerProps {
    name: string;
}

const FormImagePicker: FC<FormImagePickerProps> = ({ name }): JSX.Element => {
    const { errors, setFieldValue, touched, values } = useFormikContext();
    const myValues: any = values;
    const myErrors: any = errors;
    const myTouched: any = touched;

    const handleAdd = (uri: any) => {
        setFieldValue(name, [...myValues[name], uri]);
      }
    
      const handleDelete = (uri: any)  => {
        setFieldValue(name, myValues[name].filter((image: any) => image !== uri))
      }

    return (
        <>
            <ImageInputList 
                images={myValues[name]}
                onAddImage={handleAdd}
                onDeleteImage={handleDelete} />
            <ErrorMessage error={myErrors[name]} visible={myTouched[name]} />
        </>
    );
}

export default FormImagePicker;