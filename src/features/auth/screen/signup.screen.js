import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { MainContainer } from "../../../components/main.container.component";
import {
  LabelComponent,
  LabelFormComponent,
} from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";
import { ButtonComponent } from "../../../components/button.component";
import LogOutIcon from "../../../../assets/svgs/logout";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const LabelContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SignupScreen = ({ navigation }) => {
  const {
    isAuthenticated,
    onLogin,
    loading,
    err,
    username,
    setUsername,
    password,
    setPassword,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
    email,
    setEmail,
    emailError,
    setEmailError,
  } = useContext(AuthContext);

  return (
    <>
      <Container>
        <Spacer variant="top.large" />
        <LabelFormComponent size={"100%"}>Username</LabelFormComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={username}
          onChangeText={(text) => {
            if (text.length === 0) {
              setUsernameError(true);
            }
            if (text.length > 0 && usernameError) {
              setUsernameError(false);
            }
            setUsername(text);
          }}
          isError={usernameError}
        />
        {usernameError && <ErrorText>Username required</ErrorText>}
        <Spacer variant="top.small" />
        <Spacer variant="top.small" />
        <LabelFormComponent size={"100%"}>Email</LabelFormComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={email}
          onChangeText={(text) => {
            if (text.length === 0) {
              setEmailError(true);
            }
            if (text.length > 0 && emailError) {
              setEmailError(false);
            }
            setEmail(text);
          }}
          isError={emailError}
        />
        {emailError && <ErrorText>Email required</ErrorText>}
        <Spacer variant="top.small" />
        <Spacer variant="top.small" />
        <LabelFormComponent>Password</LabelFormComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={password}
          onChangeText={(text) => {
            if (text.length === 0) {
              setPasswordError(true);
            }
            if (text.length > 0 && passwordError) {
              setPasswordError(false);
            }
            setPassword(text);
          }}
          secure
          isError={passwordError}
        />
        {passwordError && <ErrorText>Password Required</ErrorText>}
        <Spacer variant="top.xsmall" />
        <LabelFormComponent size="small">Forgot Password?</LabelFormComponent>
        <Spacer variant="top.medium" />
        <Spacer variant="top.medium" />
      </Container>
    </>
  );
};
