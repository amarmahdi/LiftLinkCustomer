import React from "react";
import { View } from "react-native-paper";
import styled from "styled-components/native";

const Line = styled.View`
  border-bottom-color: ${(props) => props.theme.colors.darkText.inverse};
  border-bottom-width: 1px;
  width: 100%;
`;

export const LineComponent = ({ ...props }) => {
  return (
    <Line />
  );
}
