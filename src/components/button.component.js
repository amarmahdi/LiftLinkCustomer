/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { Image } from "react-native";
import styled from "styled-components/native";
import LogOutIcon from "../../assets/svgs/logout";
import { Spacer } from "./utils/spacer.component";

const StyledButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.background
      ? props.background
      : props.theme.colors.formColors.primary};
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  border-width: 0;
  height: ${(props) => props.theme.buttonSizes.xl.height};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

const StyledButtonText = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-family: ${(props) => props.theme.fonts.title2};
  font-size: ${(props) => props.theme.fontSizes.buttonTitle};
`;

const HorizontalLine = styled.View`
  height: 60%;
  border-right-width: 1px;
  border-right-color: white;
  border-style: solid;
`;

const ButtonContainer = styled.View`
  padding-top: 20px;
  width: 100%;
`;

const ButtonContainerAbsolute = styled.View`
  padding-top: 20px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.bg.primary};
  position: absolute;
  bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const ButtonComponent = ({
  children,
  title = "",
  background,
  absolute = false,
  ...props
}) => {
  // useEffect(() => {
  //   console.log("ButtonComponent props: ", children);
  // }, []);

  return (
    <>
      {!absolute && (
        <ButtonContainer>
          <StyledButton {...props} background={background}>
            {title && <StyledButtonText>{title}</StyledButtonText>}
            <Spacer variant={"left.large"} />
            <HorizontalLine />
            <Spacer variant={"left.large"} />
            {children}
          </StyledButton>
        </ButtonContainer>
      )}
      {absolute && (
        <ButtonContainerAbsolute>
          <StyledButton {...props} background={background}>
            {title && <StyledButtonText>{title}</StyledButtonText>}
            <Spacer variant={"left.large"} />
            <HorizontalLine />
            <Spacer variant={"left.large"} />
            {children}
          </StyledButton>
        </ButtonContainerAbsolute>
      )}
    </>
  );
};
