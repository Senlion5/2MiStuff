import { useContext } from 'react';
import jwtDecode from "jwt-decode";

import authStorage from './authStorage';
import AuthContext from "./context";

const useAuth = () => {
    const { user, setUser }: any =  useContext(AuthContext);

    const logIn = (authToken: string) => {
        const user: {} = jwtDecode(authToken);
        setUser(user);
        authStorage.storeToken(authToken);
    }

    const logOut = () => {
        setUser(null);
        authStorage.removeToken();
    }

    return { logIn, logOut, user };
}

export default useAuth;