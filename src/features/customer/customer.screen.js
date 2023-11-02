/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import { MainContainer } from "../../components/main.container.component";
import { CustomerCarInfoScreen } from "./screens/customer.carinfo.screen";
import { CustomerProfileScreen } from "./screens/customer.profile.screen";
import { ImageContainerProvider } from "./utils/imageObjectContainer";
import { CustomerPhoneVerificationScreen } from "./screens/customer.phone.verification.screen";
import { CustomerInfoScreen } from "./screens/customer.info.screen";
import { useIsFocused } from "@react-navigation/native";
import { CustomerContext } from "../../infrastructure/service/customer/context/customer.context";
import { ButtonComponent } from "../../components/button.component";
import LogOutIcon from "../../../assets/svgs/logout";
import styled from "styled-components/native";
import { isObjEmpty } from "../main/screen/main.screen";

export const screens = {
  profile: "profile",
  phoneVerification: "phoneVerification",
  names: "names",
  carInfo: "carInfo",
};

export const CustomerScreen = ({ children, navigation }) => {
  const { profile, setScreen, screen, updateNames } =
    useContext(CustomerContext);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const checker = () => {
    if (!profile.isVerified) {
      console.log("not verified");
      setScreen(screens.phoneVerification);
      return;
    }
    if (!profile.firstName || !profile.lastName) {
      console.log("no names");
      setScreen(screens.names);
      return;
    }
    if (isObjEmpty(profile.profilePicture)) {
      console.log("no profile picture");
      setScreen(screens.profile);
      return;
    }
    if (!profile.carModel || !profile.carPlateNumber) {
      console.log("no car info");
      setScreen(screens.carInfo);
      return;
    }
  };

  useEffect(() => {
    if (isFocused) {
      checker();
    }
    setLoading(false);
  }, [isFocused]);

  return (
    <ImageContainerProvider>
      <MainContainer showAvatar={false} showLogo={true}>
        {screen == screens.profile ? (
          <CustomerProfileScreen navigation={navigation} />
        ) : screen == screens.carInfo ? (
          <CustomerCarInfoScreen navigation={navigation} />
        ) : screen === screens.phoneVerification ? (
          <CustomerPhoneVerificationScreen navigation={navigation} />
        ) : screen === screens.names ? (
          <CustomerInfoScreen navigation={navigation} />
        ) : null}
      </MainContainer>

      {screen === "names" && (
        <ButtonComponent
          absolute={true}
          title="Next"
          onPress={async () => {
            const updateName = await updateNames();
            if (updateName) {
              if (isObjEmpty(profile.profilePicture))
                setScreen(screens.profile);
              else navigation.navigate("Home");
            } else {
              Alert.alert(
                "Alert!",
                "Failed to update names. Please try again."
              );
            }
          }}
        >
          <LogOutIcon width={24} height={24} />
        </ButtonComponent>
      )}
    </ImageContainerProvider>
  );
};
