import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '../config/colors';

interface ListingButtonProps {
    onPress: () => void;
}

const ListingButton: FC<ListingButtonProps> = ({ onPress }): JSX.Element => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons name="plus-circle" color={Colors.white} size={32} />
            </View>   
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: Colors.purple,
        borderColor: Colors.white,
        borderWidth: 8,
        borderRadius: 35,
        bottom: 25,
        height: 70,
        width: 70,
        paddingLeft: 11,
    }
})

export default ListingButton;