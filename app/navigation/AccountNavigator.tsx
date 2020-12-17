import React, { FC } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from '../screens/AccountScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MyListingsScreen from "../screens/MyListingsScreen";
import BuyerContactScreen from "../screens/BuyerContactScreen";
import MyListingDetailsScreen from '../screens/MyListingDetailsScreen';

type AccountStackParamList = {
    "Account": FC;
    "My Messages": FC;
    "My Listings": FC;
    "Contact Buyer": FC;
    "My Listing Details": FC;
};

const AccountStack = createStackNavigator<AccountStackParamList>();

const AccountNavigator: FC = (): JSX.Element => (
    <AccountStack.Navigator>
        <AccountStack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
        <AccountStack.Screen name="My Listings" component={MyListingsScreen} />
        <AccountStack.Screen name="My Listing Details" component={MyListingDetailsScreen} />
        <AccountStack.Screen name="My Messages" component={MessagesScreen} />
        <AccountStack.Screen name="Contact Buyer" component={BuyerContactScreen} />
    </AccountStack.Navigator>
);

export default AccountNavigator;