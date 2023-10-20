/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import { MainContainer } from "../../../components/main.container.component";
import styled from "styled-components/native";
import { CustomerCarInfoScreen } from "./customer.carinfo.screen";
import { CustomerProfileScreen } from "./customer.profile.screen";
import { ImageContainerProvider } from "../utils/imageObjectContainer";
import {
  CustomerProfileProvider,
  CustomerProfileContext,
} from "../../../infrastructure/service/customer/context/customer.profile.context";

const CarContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InfoContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const ScrollViewContainer = styled.ScrollView`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

const ElementsContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const ListIconContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-left: 20px;
`;

const CarChangeButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const CarChangeButton = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
`;

const ViewText = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.date};
`;

export const CustomerScreen = ({ children }) => {
  const { page, setPage, profile, tabs } = useContext(CustomerProfileContext);

  useEffect(() => {
    if (
      typeof profile.profilePicture === "undefined" ||
      Object.keys(profile.profilePicture).length === 0
    ) {
      setPage("CustomerProfile");
    } else if (
      typeof profile.car === "undefined" ||
      Object.keys(profile.car).length === 0
    ) {
      setPage("CustomerCarInfo");
    }
  }, [profile]);

  return (
    <ImageContainerProvider>
      <MainContainer
        showAvatar={false}
        showLogo={true}
        showTab={true}
        tabs={tabs}
      >
        {page == "CustomerProfile" ? (
          <CustomerProfileScreen />
        ) : page == "CustomerCarInfo" ? (
          <CustomerCarInfoScreen />
        ) : null}
      </MainContainer>
    </ImageContainerProvider>
  );
};
