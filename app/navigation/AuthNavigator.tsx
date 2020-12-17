import React, { FC } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

type AuthStackParamList = {
    Welcome: FC;
    Login: FC;
    Register: FC;
  };

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: FC = (): JSX.Element => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegistrationScreen} />
    </AuthStack.Navigator>
)

export default AuthNavigator;