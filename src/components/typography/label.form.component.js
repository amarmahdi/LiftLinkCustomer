/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components/native";

const FormLabel = styled.Text`
  color: #2e2c2f;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.28px;
`;

export const LabelFormComponent = ({ children, size }) => {
  return <FormLabel size={size}>{children}</FormLabel>;
};
