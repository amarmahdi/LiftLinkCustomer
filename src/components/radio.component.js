import React from "react";
import styled from "styled-components/native";
import { RadioButton } from "react-native-paper";

const RadioContainer = styled.View`
  padding: 0;
  margin: 0;
`;

const RadioText = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.title};
`;

const StyledRadioButton = styled(RadioButton)`
  padding: 0;
  margin: 0;
`;

export const RadioComponent = ({ children, title = "", ...props }) => {
  return (
    <RadioContainer>
      <StyledRadioButton />
    </RadioContainer>
  );
}