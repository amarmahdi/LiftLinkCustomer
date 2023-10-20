import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { CustomerContext } from "../../../infrastructure/service/customer/context/customer.context";
import { MainContainer } from "../../../components/main.container.component";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { buttonSizes } from "../../../infrastructure/theme/sizes";
import LogoSvg from "../../../../assets/svgs/logo";
import styled from "styled-components";

export const isObjEmpty = (obj) => {
  return typeof obj === "undefined"
    ? true
    : Object.keys(obj).length === 0
    ? true
    : false;
};

const ScreenCenteredView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const LogoContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 200px;
  position: absolute;
`;

const FixedBackground = styled.ImageBackground`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainScreen = ({ navigation }) => {
  const {
    profile,
    loading: userContextLoading,
    getUserData,
  } = useContext(CustomerContext);
  const [loading, setLoading] = useState(true);

  const userdata = async () => {
    await getUserData();
    console.log(profile, "profile");
  };

  const changePage = async () => {
    if (isObjEmpty(profile.profilePicture) && isObjEmpty(profile.car)) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    if (loading) {
      userdata();
    }
  }, [loading]);

  useEffect(() => {
    if (!isObjEmpty(profile)) {
      setTimeout(() => {
        changePage();
        setLoading(false);
      }, 2000);
    }
  }, [profile]);

  return (
    <ScreenCenteredView>
      <FixedBackground
        source={require("../../../../assets/backgroundPatterns.png")}
      >
        <LogoContainer>
          <LogoSvg />
        </LogoContainer>
      </FixedBackground>
    </ScreenCenteredView>
  );
};
