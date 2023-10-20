/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import { Image } from "react-native";
import styled from "styled-components/native";
import LogOutIcon from "../../assets/svgs/logout";
import { Spacer } from "./utils/spacer.component";

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.formColors.primary};
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  border-width: 1px;
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
  height: 100%;
  border-right-width: 1px;
  border-right-color: white;
  border-style: solid;
`;

export const ButtonComponent = ({ children, title = "", ...props }) => {
  let Icon = null;
  React.Children.forEach(children, (child) => {
    if (child.props.isIcon) {
      Icon = child;
    }
  });

  return (
    <StyledButton {...props}>
      {title && <StyledButtonText>{title}</StyledButtonText>}
      <Spacer variant={"left.large"} />
      <HorizontalLine />
      <Spacer variant={"left.large"} />
      {Icon}
    </StyledButton>
  );
};
