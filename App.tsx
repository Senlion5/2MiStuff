import React, { FC, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import AuthNavigator from "./app/navigation/AuthNavigator";
import myTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/authStorage";
import { navigationRef } from "./app/navigation/rootNavigation";
import { User } from "./app/config/user";

const App: FC = (): JSX.Element => {
  const [user, setUser] = useState<User>();
  const [isReady, setIsReady] = useState<boolean>(false);
  
  const restoreUser = async () => {
    const user: User = await authStorage.getUser() as User;
    if (user) setUser(user);
  }

  if (!isReady) 
    return (<AppLoading startAsync={restoreUser} onFinish={() => {setIsReady(true)}} />);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
    <OfflineNotice />
    <NavigationContainer ref={navigationRef} theme={myTheme} >
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
    </AuthContext.Provider>
    )
};

export default App;

