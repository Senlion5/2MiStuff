import React, { FC } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListingsEditScreen from "../screens/ListingEditScreen";
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import ListingButton from './ListingButton';
import { Routes } from "./routes";
import useNotifications from './../hooks/useNotifications';

type AppTabParamList = {
    Feed: FC;
    ListingEdit: FC;
    Account: FC;
};

const AppTab = createBottomTabNavigator<AppTabParamList>();  

const AppNavigator: FC = (): JSX.Element => {
    useNotifications();

    return (
        <AppTab.Navigator>
            <AppTab.Screen 
                name="Feed" 
                component={FeedNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => 
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                }} 
            />
            <AppTab.Screen 
                name="ListingEdit" 
                component={ListingsEditScreen}
                options={({ navigation }) => ({
                    tabBarButton: () => <ListingButton onPress={() => navigation.navigate(Routes.LISTING_EDIT)} />,
                    tabBarIcon: ({ color, size }) => 
                        <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
                })}  
            />
            <AppTab.Screen 
            name="Account" 
            component={AccountNavigator}
            options={{
                tabBarIcon: ({ color, size }) => 
                    <MaterialCommunityIcons name="account" color={color} size={size} />
            }} 
            />
        </AppTab.Navigator>
    );
};

export default AppNavigator;