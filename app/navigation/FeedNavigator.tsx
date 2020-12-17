import React, { FC } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import ListingsScreen from '../screens/ListingsScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';

type FeedStackParamList = {
    "Listings": FC;
    "Item Details": FC;
  };

const FeedStack = createStackNavigator<FeedStackParamList>();

const FeedNavigator: FC = (): JSX.Element => (
    <FeedStack.Navigator>
        <FeedStack.Screen name="Listings" component={ListingsScreen} options={{ headerShown: false }} />
        <FeedStack.Screen name="Item Details" component={ListingDetailsScreen} />
    </FeedStack.Navigator>
);

export default FeedNavigator;