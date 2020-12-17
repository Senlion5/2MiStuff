import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import ImageInput from "./ImageInput";

interface UserImageInputProps {
    images: Array<any>;
    onDeleteImage: (ImageInfo: any) => typeof ImageInfo;
    onAddImage: (ImageInfo: any) => typeof ImageInfo;
}

const UserImageInput: FC<UserImageInputProps> = ({ images, onDeleteImage, onAddImage }): JSX.Element => {
    
    return (
        <View style={styles.image}>
            {images.map((uri) => (
                <View key={uri}>
                    <ImageInput 
                    image={uri} 
                    onChangeImage={() => onDeleteImage(uri)} />
                </View>
            ))}
            {(!images[0]) && <ImageInput onChangeImage={(uri) => onAddImage(uri)} />}    
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
      marginRight: 10,
      marginLeft: 10
    }
})

export default UserImageInput;