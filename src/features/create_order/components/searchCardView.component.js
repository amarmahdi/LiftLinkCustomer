import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { CardComponent } from "../../../components/utils/card.component";
import ProceedSvg from "../../../../assets/svgs/proceed";
import GpsSvg from "../../../../assets/svgs/gps";
import { theme } from "../../../infrastructure/theme/";
import { ServiceContext } from "../../../infrastructure/service/create_service/context/service.context";
import { getGeocode } from "../service/dealershipInfo.service";

const CardItemsContainer = styled.Pressable`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 10px;
  height: 100%;
`;

const CardHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 50px;
`;

const TextContainer = styled.View``;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.title};
`;

const LocationText = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.body};
`;

const CardBody = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 10px;
`;

const LocationInfoContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const SearchCardView = ({ data, title, address, country, city, key }) => {
  const [selected, setSelected] = useState(false);
  const { selectedDealership, setSelectedDealership } =
    useContext(ServiceContext);

  const selectedDealershipFunc = async (data) => {
    if (selectedDealership === data) {
      setSelectedDealership({});
      return;
    }
    setSelectedDealership(data);
  };

  useEffect(() => {
    if (selectedDealership === data) {
      setSelected(selected ? false : true);
    } else {
      setSelected(false);
    }
  }, [selectedDealership]);

  return (
    <>
      <CardComponent
        overrideChildren={true}
        backgroundColor={
          !selected ? theme.colors.bg.secondary : theme.colors.bg.primary
        }
        size={{
          width: "260px",
          height: "160px",
        }}
        key={key}
      >
        <CardItemsContainer
          onPress={() => {
            selectedDealershipFunc(data);
          }}
        >
          <CardHeader>
            <TextContainer>
              <Title>{title}</Title>
            </TextContainer>
            <ProceedSvg width={"50px"} height={"50px"} />
          </CardHeader>
          <CardBody>
            <GpsSvg width={"50px"} height={"50px"} />
            <LocationInfoContainer>
              <Title>{address}</Title>
              <LocationText>
                {country} {city}
              </LocationText>
            </LocationInfoContainer>
          </CardBody>
        </CardItemsContainer>
      </CardComponent>
    </>
  );
};
