import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components/native";
import { InputComponent } from "../../../components/input.component";
import { ServiceContext } from "../../../infrastructure/service/create_service/context/service.context";
import { isObjEmpty } from "../../main/screen/main.screen";
import debounce from "lodash/debounce";
import { SearchCardView } from "./../components/searchCardView.component";
import MapView from "react-native-maps";
import { OverlayComponent } from "../../../components/overlay.component";
import { LabelComponent } from "../../../components/typography";
import * as ScreenOrientation from 'expo-screen-orientation'

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CardsContainer = styled.ScrollView`
  flex-direction: row;
  position: absolute;
  bottom: 0;
  padding: 20px;
`;

const Spacer = styled.View`
  width: 20px;
`;

const SearchBarContainer = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: 20px;
  position: absolute;
  top: 0;
  z-index: 1;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.title};
`;

export const DealershipScreen = ({ navigation }) => {
  const [dealershipSelected, setdealershipSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dealerships, setDealerships] = useState([]);
  const [dselectd, setDselected] = useState({});
  const {
    setLoading,
    selectedDealership,
    setSelectedDealership,
    findDealerships,
    data,
    error,
  } = useContext(ServiceContext);

  useEffect(() => {
    if (!isObjEmpty(data)) {
      setLoading(false);
      setDealerships(data?.findDealerships);
    }
  }, [data]);

  useEffect(() => {
    if (!isObjEmpty(selectedDealership)) {
      setDselected(selectedDealership);
      setdealershipSelected(true);
    }
  }, [selectedDealership]);

  useEffect(() => {
    console.log("dealerships", dealerships);
  }, [dealerships]);

  useEffect(() => {
    console.log("error", error);
  }, [error]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      debouncedFindDealerships(searchTerm);
    }
  }, [searchTerm]);

  const debouncedFindDealerships = useCallback(
    debounce(async (searchTerm) => {
      await findDealerships({
        variables: {
          searchTerm: searchTerm,
        },
      });
    }, 500),
    []
  );

  const onCancel = () => {
    setSelectedDealership({});
    setDselected({});
    setdealershipSelected(false);
  };

  const onConfirm = () => {
    setSelectedDealership(dselectd);
    navigation.navigate("Category");
  };

  useEffect(() => {
    async function setOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.UNKNOWN
      );
    }
    setOrientation();
  }, []);

  return (
    <Container>
      <MapView style={{ width: "100%", height: "100%" }} />
      <SearchBarContainer>
        <InputComponent
          placeholder={"Search..."}
          onChangeText={async (text) => {
            setSearchTerm(text);
          }}
        />
      </SearchBarContainer>
      <CardsContainer horizontal={true}>
        {dealerships.map((item) => (
          <>
            <SearchCardView
              title={item.dealershipName}
              address={item.dealershipAddress}
              city={item.dealershipCity}
              country={item.dealershipCountry}
              data={item}
              onPress={() => setSelectedDealership(item)}
              key={item.dealershipId}
            />
            <Spacer />
          </>
        ))}
      </CardsContainer>
      {dealershipSelected && (
        <OverlayComponent onCancel={onCancel} onConfirm={onConfirm}>
          <LabelComponent title={true}>Selected Dealership</LabelComponent>
          <LabelComponent title2={true}>{dselectd.dealershipName}</LabelComponent>
          <LabelComponent title2={true}>{dselectd.dealershipAddress}</LabelComponent>
          <LabelComponent title2={true}>{dselectd.dealershipCity}</LabelComponent>
          <LabelComponent title2={true}>{dselectd.dealershipCountry}</LabelComponent>
        </OverlayComponent>
      )}
    </Container>
  );
};
