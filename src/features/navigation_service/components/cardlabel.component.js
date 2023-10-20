import React from "react";
import styled from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.cardTitle};
`;

export const CardLabelComponent = ({ children }) => {
  return <StyledText>{children}</StyledText>;
}

