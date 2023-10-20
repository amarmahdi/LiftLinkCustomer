import React, { useContext, useEffect, useState } from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { buttonSizes } from "../../../infrastructure/theme/sizes";
import { ServiceContext } from "../../../infrastructure/service/create_service/context/service.context";
import { isObjEmpty } from "../../main/screen/main.screen";
import { MainContainer } from "../../../components/main.container.component";
import styled from "styled-components/native";
import { LabelComponent } from "../../../components/typography/label.component";
import { ButtonComponent } from "../../../components/button.component";
import LogOutIcon from "../../../../assets/svgs/logout";
import { Spacer } from "../../../components/utils/spacer.component";
import ProceedSvg from "../../../../assets/svgs/proceed";
import CancelSvg from "../../../../assets/svgs/cancel";
import { Alert } from "react-native";

const ScrollView = styled.ScrollView`
  flex-direction: column;
  width: 100%;
  margin-top: 40px;
`;

const ContentContainer = styled.Pressable`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const RadioBtn = styled.Pressable`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.brand.primary};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.brand.primary
      : props.theme.colors.bg.primary};
`;

const CardContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
`;

const SmallDescription = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.body};
`;

const Content = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  box-shadow: 2px 4px 20px rgba(46, 44, 47, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Button = styled(ButtonComponent)`
  width: 80%;
`;

export const CategoryScreen = ({ navigation }) => {
  const {
    selectedDealership,
    findServices,
    serviceData,
    setSelectedServicePackage,
  } = useContext(ServiceContext);
  const [servicePackagesList, setServicePackagesList] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (isObjEmpty(serviceData)) {
      findServices({
        variables: {
          dealershipId: selectedDealership.dealershipId,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (!isObjEmpty(serviceData)) {
      setServicePackagesList(serviceData?.getServicePackages || []);
    }
  }, [serviceData]);

  const addServicePackage = (item) => {
    // setSelected([...selected, item.servicePackageId]);
    setSelectedServicePackage(item);
  };

  const removeServicePackage = (item) => {
    const index = selected.indexOf(item.servicePackageId);
    if (index > -1) {
      selected.splice(index, 1);
    }
    setSelected([...selected]);
    setSelectedServicePackage({});
  };

  const checkSelected = (item) => {
    return selected.servicePackageId === item.servicePackageId;
  };

  return (
    <>
      <MainContainer>
        <ScrollView>
          {servicePackagesList.map((item, i) => (
            <ContentContainer
              key={item.servicePackageId}
              onPress={() => {
                setSelected(item);
              }}
              >
              <Content key={item.servicePackageId + "_" + i}>
                <RadioBtn selected={checkSelected(item)} />
                <CardContainer  key={item.servicePackageId + "_" + i + 1}>
                  <TextContainer>
                    <LabelComponent title1={true}>
                      {item.servicePackageName}
                    </LabelComponent>
                    <LabelComponent title2={true}>
                      {item.servicePackageDescription}
                    </LabelComponent>
                  </TextContainer>
                </CardContainer>
              </Content>
            </ContentContainer>
          ))}
          <Spacer variant="top.large" />
          <Spacer variant="top.large" />
          <Spacer variant="top.large" />
          <ButtonContainer>
            <Button
              title="Proceed"
              onPress={() => {
                if (isObjEmpty(selected)) {
                  Alert.alert("Alert!", "Please select a service package.");
                }
                addServicePackage(selected);
                navigation.navigate("ServiceDetail");
              }}
            >
              <ProceedSvg isIcon={true} width={24} height={24} />
            </Button>
          </ButtonContainer>
        </ScrollView>
      </MainContainer>
    </>
  );
};
