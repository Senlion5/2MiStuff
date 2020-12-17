import React, { FC, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  ErrorMessage,
  CustomFormField,
  CustomFormikForm,
  SubmitButton,
} from "../components/forms";
import LogoHeader from "../components/LogoHeader";
import Screen from "../components/Screen";
import useAuth from '../auth/useAuth';
import usersApi, { UserInfoProps } from "../api/users";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import LoadingIndicator from "../components/LoadingIndicator";
import { Colors } from "../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).max(64).label("Name"),
  email: Yup.string().required().min(5).max(128).email().label("Email"),
  password: Yup.string().required().min(3).max(64).label("Password")
});

const RegistrationScreen: FC = (): JSX.Element => {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (userInfo: UserInfoProps) => {
    const result = await registerApi.request(userInfo);
    
    if (!result.ok) {
      const receivedError: any = result.data;
      if (receivedError) setError(receivedError.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }

    const { data } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    const authToken = data as string; 
    auth.logIn(authToken);
  }

  return (
    <ScrollView>
      <LoadingIndicator visible={registerApi.isLoading || loginApi.isLoading} />
      <Screen style={styles.container}>
        <LogoHeader />

        <CustomFormikForm
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={true} />
          <CustomFormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <CustomFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            name="email"
            keyboardType="email-address"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <CustomFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" color={Colors.brown} />
        </CustomFormikForm>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 22,
    marginRight: 22,
  },
});

export default RegistrationScreen;
