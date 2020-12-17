import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  ErrorMessage,
  CustomFormField,
  CustomFormikForm,
  SubmitButton,
} from "../components/forms";
import LogoHeader from "../components/LogoHeader";
import Screen from "../components/Screen";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import { Colors } from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(3).max(32).label("Password"),
});

const LoginScreen: FC = (): JSX.Element => {
  const { logIn } = useAuth();

  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }: any) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    const token: any = result.data;
    logIn(token);
  }

  return (
    <Screen style={styles.container}>
      <LogoHeader />

      <CustomFormikForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Invalid email or password." visible={loginFailed} />
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
        <SubmitButton title="Login" color={Colors.brown}/>
      </CustomFormikForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 22,
    marginRight: 22,
  },
});

export default LoginScreen;
