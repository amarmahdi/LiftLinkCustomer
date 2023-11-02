import React from "react";
import styled from "styled-components/native";

const Chip = styled.View`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 12px;
  padding-right: 12px;
  dipaly: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: ${(props) => props.theme.colors.buttonColors.primary};
`;

export const ChipComponent = ({ children }) => {
  return <Chip>{children}</Chip>;
};
