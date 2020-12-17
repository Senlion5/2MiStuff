import React, { FC } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import MessagesScreen from '../screens/MessagesScreen';
import BuyerContactScreen from "../screens/BuyerContactScreen";

type MessagesStackParamList = {
    "My Messages": FC;
    "Contact Buyer": FC;
  };

const MessagesStack = createStackNavigator<MessagesStackParamList>();

const MessagesNavigator: FC = (): JSX.Element => (
    <MessagesStack.Navigator>
        <MessagesStack.Screen name="My Messages" component={MessagesScreen} />
        <MessagesStack.Screen name="Contact Buyer" component={BuyerContactScreen} />
    </MessagesStack.Navigator>
);

export default MessagesNavigator;