import React, { useContext, useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Container } from "../../../components/utils/container.component";
import { CardLabelComponent } from "../components/cardlabel.component";
import { SubtitleComponent } from "../components/subtitle.component";
import { Spacer } from "../../../components/utils/spacer.component";
import SlideButton from "rn-slide-button";
import MapView, { Marker } from "react-native-maps";
import { ServiceContext } from "../../../infrastructure/service/create_service/context/service.context";
import { useSubscription } from "@apollo/client";
import { GET_DRIVER_LOCATION } from "../../../infrastructure/service/subscription";
import { isObjEmpty } from "../../main/screen/main.screen";

const TextView = styled.Text`
  color: ${(props) => props.theme.colors.darkText.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

const CardContainer = styled.View`
  position: absolute;
  width: 100%;
  left: ${(props) => props.theme.screenSizes.original.width * 0.05 - 3.5}px;
  bottom: ${(props) => props.theme.screenSizes.original.width * 0.05}px;
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

const BackButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.darkUI.primary};
  justify-content: center;
  align-items: center;
`;

export const MapScreen = ({ navigation }) => {
  const { data: driverLocationData } = useSubscription(GET_DRIVER_LOCATION);
  const [driverLocation, setDriverLocation] = useState({});

  useEffect(() => {
    if (driverLocationData) {
      console.log(driverLocationData.driverLocation);
      setDriverLocation({
        latitude: driverLocationData.driverLocation.latitude,
        longitude: driverLocationData.driverLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [driverLocationData]);

  return (
    <Container>
      <BackButtonContainer>
        <BackButton onPress={() => navigation.goBack()}>
          <TextView>Back</TextView>
        </BackButton>
      </BackButtonContainer>
      <>
        {/* <MapView style={{ width: "100%", height: "100%" }} /> */}
        {!isObjEmpty(driverLocation) && (
          <MapView
            style={{ width: "100%", height: "100%" }}
            region={driverLocation}
          >
            <Marker coordinate={driverLocation} />
          </MapView>
        )}
      </>
    </Container>
  );
};
