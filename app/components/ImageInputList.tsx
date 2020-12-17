import React, { FC, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import ImageInput from "./ImageInput";

interface ImageInputListProps {
    images: Array<any>;
    onDeleteImage: (ImageInfo: any) => typeof ImageInfo;
    onAddImage: (ImageInfo: any) => typeof ImageInfo;
}

const ImageInputList: FC<ImageInputListProps> = ({ images, onDeleteImage, onAddImage }): JSX.Element => {
    const scrollView: any = useRef();
    
    return (
        <View>
            {scrollView && 
            <ScrollView 
                ref={scrollView} 
                horizontal 
                onContentSizeChange={() => scrollView.current.scrollToEnd()}
            >
                <View style={styles.container}>
                    {images.map((uri) => (
                        <View key={uri} style={styles.image}>
                            <ImageInput 
                            image={uri} 
                            onChangeImage={() => onDeleteImage(uri)} />
                        </View>
                    ))}
                <ImageInput onChangeImage={(uri) => onAddImage(uri)} />    
            </View>
            </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    image: {
      marginRight: 2,
    }
})

export default ImageInputList;