import React, { useContext, useEffect, useState } from "react";
import LogoSvg from "../../../../assets/svgs/logoLoadingIndicator";
import styled from "styled-components/native";
import { CustomerContext } from "../../../infrastructure/service/customer/context/customer.context";

export const isObjEmpty = (obj) => {
  return typeof obj === "undefined" || obj === null
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
    if (!profile.isVerified || isObjEmpty(profile.car) || isObjEmpty(profile.profilePicture) && !userContextLoading) {
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
