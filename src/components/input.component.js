/* eslint-disable react/prop-types */
import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import React from "react";

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

export const InputComponent = ({ ...props }) => {
  return (
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
  );
};
