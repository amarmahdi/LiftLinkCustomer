/* eslint-disable react/prop-types */
import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import React from "react";
import { Spacer } from "./utils/spacer.component";

const InputField = styled(TextInput)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  border-width: 1px;
  border-color: ${(props) =>
    !props.isError
      ? props.theme.colors.formColors.border
      : props.theme.colors.formColors.error};
  width: 100%;
  height: ${(props) => props.height || "60px"};
  max-height: ${(props) => props.height || "60px"};
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const InputComponent = ({ ...props }) => {
  return (
    <>
      <InputField
        mode="flat"
        activeUnderlineColor="transparent"
        selectionColor="black"
        underlineColor="transparent"
        textColor="black"
        cursorColor="black"
        placeholderTextColor={(props) => props.theme.colors.formColors.border}
        secureTextEntry={props.secure}
        {...props}
      />
      <Spacer variant="top.small" />
      {props.isError && <ErrorText>{props.errorText}</ErrorText>}
    </>
  );
};
