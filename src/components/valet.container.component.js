import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: transparent;
`;

const PositionedImage = styled.Image`
  position: absolute;
  top: 50px;
  left: 50%;
  width: 80%;
  z-index: 9999;
  margin-left: -32%;
  resize-mode: contain;
`;

const HeaderTitleContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
`;

const FixedBackgroundImg = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export const ValetContainer = ({ children }) => {
  return (
    <>
      <FixedBackgroundImg source={require("../../assets/bg.png")} />
      <Container>
        <HeaderTitleContainer></HeaderTitleContainer>
        <PositionedImage source={require("../../assets/genesis-car-img.png")} />
        {children}
      </Container>
    </>
  );
};