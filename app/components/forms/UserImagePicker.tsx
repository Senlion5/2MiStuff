import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import { View, StyleSheet } from "react-native";

import UserImageInput from '../UserImageInput';
import ErrorMessage from './ErrorMessage';

interface UserImagePickerProps {
    name: string;
}

const UserImagePicker: FC<UserImagePickerProps> = ({ name }): JSX.Element => {
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
        <View style={styles.container}>

            <View style={styles.error}>
                <ErrorMessage error={myErrors[name]} visible={myTouched[name]} />
            </View>
            
            <UserImageInput 
                images={myValues[name]}
                onAddImage={handleAdd}
                onDeleteImage={handleDelete} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    error: {
        marginBottom: 4
    }
})

export default UserImagePicker;