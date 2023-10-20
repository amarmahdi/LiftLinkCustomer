import React from "react";
import { View, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Container } from "../../../components/utils/container.component";
import { CardLabelComponent } from "../components/cardlabel.component";
import { SubtitleComponent } from "../components/subtitle.component";
import { Spacer } from "../../../components/utils/spacer.component";
import SlideButton from "rn-slide-button";

const TextView = styled.Text`
  color: ${(props) => props.theme.colors.darkText.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

const CardContainer = styled.View`
  position: absolute;
  width: 100%;
  left: ${(props) => ((props.theme.screenSizes.original.width * 0.05) - 3.5)}px;
  bottom: ${(props) => (props.theme.screenSizes.original.width * 0.05)}px;
  border-radius: 0px;
  background-color: transparent;
  justify-content: flex-end;
  align-items: flex-end;
  `;

const BottomCard = styled(Card)`
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  padding: ${(props) => props.theme.lineHeights.title};
  background-color: ${(props) => props.theme.colors.darkBg.secondary};
  flex-direction: column;
  justify-content: space-between;
`;

const CustomerInfo = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MapScreen = () => {
  return (
    <Container>
      <>
        <View>
          <TextView>MapScreen</TextView>
        </View>
        <CardContainer>
          <BottomCard>
            <CardLabelComponent>
              Journey Info.
            </CardLabelComponent>
            <Spacer variant="bottom.small" />
            <SubtitleComponent />
            <Spacer variant="bottom.large" />
            <Spacer variant="bottom.small" />
            <CustomerInfo>
              <TextView>Customer Name</TextView>
              <TextView>Customer Phone</TextView>
            </CustomerInfo>
            <Spacer variant="bottom.large" />
            <SlideButton
              width={Dimensions.get("window").width * 0.9 - 40}
              height={Dimensions.get("window").height * 0.07}
              onToggle={() => {
                console.log("Toggle event");
              }}
            />
          </BottomCard>
        </CardContainer>
      </>
    </Container>
  );
}