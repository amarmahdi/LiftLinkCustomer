import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { LabelComponent } from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { ButtonComponent } from "../../../components/button.component";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { Alert } from "react-native";
import { CustomerContext } from "../../../infrastructure/service/customer/context/customer.context";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const CarImg = styled.Image`
  width: 164%;
  margin-left: -60%;
  object-fit: contain;
  background-color: black;
  z-index: 1;
`;

const OverlayImg = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: black;
  position: absolute;
  z-index: 2;
  opacity: 0.5;
`;

const ForegroundOverlay = styled.View`
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  z-index: 3;
  opacity: 0.7;
`;

const LabelContainer = styled.View`
  position: absolute;
  z-index: 4;
  bottom: 0;
  left: 0;
  padding: 20px;
`;

export const Splash = ({ navigation }) => {
  const {
    isAuthenticated,
    loading: authLoading,
    err,
  } = useContext(AuthContext);
  const { profile, loading, getUserData } = useContext(CustomerContext);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    if (!loading && !authLoading && !err) {
      setLoadingState(false);
      changeScreen();
    }
  }, [loading, authLoading]);

  useEffect(() => {
    if (err) {
      setLoadingState(false);
      Alert.alert("Alert!", "Internal Server Error. Please try again.");
    }
  }, [err]);

  const handleGetStarted = async () => {
    console.log("isAuthenticated loading", authLoading);
    await getUserData();
    if (!loading && !authLoading && !err) {
      changeScreen();
    }
  };

  const changeScreen = () => {
    if (isAuthenticated && Object.keys(profile).length !== 0) {
      setTimeout(() => {
        navigation.navigate("MainNavigation");
      }, 2000);
    } else if (!isAuthenticated && Object.keys(profile).length === 0 && !err) {
      setTimeout(() => {
        navigation.navigate("AuthNavigation");
      }, 2000);
    }
  };

  useEffect(() => {
    handleGetStarted();
  }, []);

  return (
    <Container>
      <OverlayImg source={require("../../../../assets/splashbackground.png")} />
      <LabelContainer>
        <LabelComponent
          title1={true}
          inverted={true}
          styles={{
            fontSize: 20,
            fontWeight: "bold",
            lineHeight: 48,
          }}
        >
          Enhance the Luxury Revolution.
        </LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent
          title2={true}
          inverted={true}
          styles={{
            fontSize: 12,
            textShadowColor: "rgba(0, 0, 0, 0.25)",
          }}
        >
          Indulge your vehicle with the care it deserves. Use Lift Link to
          schedule repairs, maintenance, and more from our team of certified
          experts devoted to their craft.
        </LabelComponent>
        <Spacer variant="top.large" />
        <Spacer variant="top.large" />
        <ButtonComponent
          title="Get Started"
          onPress={async () => await handleGetStarted()}
        />
      </LabelContainer>
    </Container>
  );
};
