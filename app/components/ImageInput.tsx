import React, { FC, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Colors } from "../config/colors";

interface ImageInputProps {
    image?: any;
    onChangeImage: (ImageInfo: any) => void;
}

const ImageInput: FC<ImageInputProps> = ({ image, onChangeImage }): JSX.Element => {
    useEffect(() => {
        requestPermission();
    }, []);
    
    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
         if (!granted) 
          alert("You need to enable permission to access the library.");
      }
    
    const handlePress = () => {
        if (!image) selectImage();
        else Alert.alert("Delete", "Please, confirm image delete.", [{
            text: "Yes", onPress: () => onChangeImage(null)
        }, { text: "Cancel" }])
    } 

    const selectImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0.5
          });
          if (!result.cancelled) onChangeImage(result.uri);
        } catch (error) {
          console.log("Error reading an image", error);
        }
      }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!image && <MaterialCommunityIcons color={Colors.medium} name="camera" size={42} />}
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        overflow: "hidden",
        margin: 5
    },
    image: {
       width: "100%",
       height: "100%", 
    }
})

export default ImageInput;