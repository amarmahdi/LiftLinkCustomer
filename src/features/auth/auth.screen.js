import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Alert, Pressable } from "react-native";
import { AuthContext } from "../../infrastructure/service/authentication/context/auth.context";
import { MainContainer } from "../../components/main.container.component";
import { SigninScreen } from "./screen/signin.screen";
import { LabelComponent } from "../../components/typography";
import { ButtonComponent } from "../../components/button.component";
import LogOutIcon from "../../../assets/svgs/logout";
import { Spacer } from "../../components/utils/spacer.component";
import { SignupScreen } from "./screen/signup.screen";

const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
`;

const LabelContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AuthScreen = ({ navigation }) => {
  const {
    loading,
    error,
    setError,
    isAuthenticated,
    onLogin,
    screen,
    setScreen,
    username,
    password,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
    email,
    emailError,
    setEmailError,
    onSignup,
  } = useContext(AuthContext);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("MainNavigation");
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      const data = await onLogin(username, password);
      console.log("data", data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      setLoadingState(false);
    }
    if (error) {
      setLoadingState(false);
    }
    if (usernameError || passwordError) {
      setLoadingState(false);
    }
    if (loading) {
      setLoadingState(true);
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      Alert.alert("Alert!", "Failed to login. Please try again.");
      setLoadingState(false);
    }
  }, [error]);

  return (
    <MainContainer showLogo={true} showGreetings={true}>
      <ScrollView>
        <LabelContainer>
          <LabelComponent title={true}>
            {screen === "signin" ? "Sign In" : "Sign Up"}
          </LabelComponent>
          <Pressable
            onPress={() => {
              setScreen(screen === "signin" ? "signup" : "signin");
            }}
          >
            <LabelComponent dateTitle={true}>
              {screen === "signin" ? "Sign Up" : "Sign In"}
            </LabelComponent>
          </Pressable>
        </LabelContainer>
        <Spacer variant={"top.large"} />
        {screen === "signin" && <SigninScreen navigation={navigation} />}
        {screen === "signup" && <SignupScreen navigation={navigation} />}
      </ScrollView>
      {screen === "signin" && (
        <ButtonComponent
          title="Sign In"
          onPress={async () => {
            if (username === "") setUsernameError(true);
            if (password === "") setPasswordError(true);
            if (!usernameError && !passwordError && username && password)
              await handleLogin();
          }}
          loading={loadingState}
        >
          <LogOutIcon width={24} height={24} />
        </ButtonComponent>
      )}
      {screen === "signup" && (
        <ButtonComponent
          title="Sign Up"
          onPress={async () => {
            if (username === "") setUsernameError(true);
            if (password === "") setPasswordError(true);
            if (email === "") setEmailError(true);
            if (
              !usernameError &&
              !passwordError &&
              !emailError &&
              username &&
              password &&
              email
            )
              await onSignup(username, password, email);
          }}
        >
          <LogOutIcon width={24} height={24} />
        </ButtonComponent>
      )}
    </MainContainer>
  );
};
