/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { LabelComponent } from "../../../components/typography/label.component";
import { MainContainer } from "../../../components/main.container.component";
import { Spacer } from "../../../components/utils/spacer.component";
import styled from "styled-components/native";
import RedirectIcon from "../../../../assets/svgs/redirect";
import { Pressable } from "react-native";
import { CustomerContext } from "../../../infrastructure/service/customer/context/customer.context";
import { ServiceContext } from "../../../infrastructure/service/create_service/context/service.context";
import { isObjEmpty } from "./main.screen";
import { ChipComponent } from "../../../components/utils/chip.component";

const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Avatar = styled.View`
  width: 54px;
  height: 54px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

const UsernameContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const HomeContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
`;

const Image = styled.Image`
  resize-mode: contain;
  width: 100%;
`;

const ListContainer = styled.Pressable`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const ListComponent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CarDescription = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const List = styled.FlatList`
  width: 100%;
`;

const ListCard = styled.View`
  width: 100%;
  max-height: 600px;
  padding: 20px;
  margin-bottom: 40px;
  margin-top: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.formColors.border};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const LabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 20px;
`;

const CarImageContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 250px;
`;

const CarImage = styled.Image`
  border-radius: 20px;
  width: 100%;
  height: 100%;
  resize-mode: cover;
  border-radius: 20px;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ScrollViewContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const DescriptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HomeScreen = ({ navigation }) => {
  const { profile } = useContext(CustomerContext);
  const {
    setSelectedCar,
    onGetStartedOrders,
    setStartedOrders,
    startedOrders,
    startedOrdersLoading,
    startedOrderError,
    setSelectedOrder,
  } = useContext(ServiceContext);

  useEffect(() => {
    onGetStartedOrders();
  }, []);

  useEffect(() => {
    if (startedOrderError) {
      console.log("error", startedOrderError);
    }
  }, [startedOrderError]);

  return (
    <MainContainer
      title={profile?.firstName + " " + profile?.lastName}
      showGreetings={true}
      showAvatar={true}
      showMenu={true}
      imageUrl={profile.profilePicture.pictureLink}
    >
      <HomeContainer>
        <Spacer variant="top.medium" />
        <LabelContainer>
          <LabelComponent title2={true}>My Cars</LabelComponent>
          <Pressable onPress={() => navigation.navigate("AddCar")}>
            <LabelComponent>Add Car</LabelComponent>
          </Pressable>
        </LabelContainer>
        <ScrollViewContainer>
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            pinchGestureEnabled={true}
          >
            {!startedOrdersLoading &&
              profile.car.map((item) => {
                if (!isObjEmpty(startedOrders)) {
                  return startedOrders.map((service) => {
                    if (
                      service.vehicle.carImage.imageId === item.carImage.imageId
                    ) {
                      return (
                        <ListContainer
                          onPress={async () => {
                            await setSelectedOrder(service);
                            navigation.navigate("Details");
                          }}
                        >
                          <ListCard>
                            <ListComponent>
                              <CarDescription>
                                <LabelComponent>
                                  {item.carMake} {item.carModel}
                                </LabelComponent>
                                <LabelComponent title2={true}>
                                  You have a service in progress
                                </LabelComponent>
                              </CarDescription>
                              <RedirectIcon width={24} height={24} />
                            </ListComponent>
                            <Spacer variant="top.medium" />
                            <CarImageContainer>
                              <CarImage
                                source={{ uri: item.carImage.imageLink }}
                              />
                            </CarImageContainer>
                            <Spacer variant="top.medium" />
                            <DescriptionContainer>
                              <LabelComponent>
                                {service.serviceType.servicePackageName}
                              </LabelComponent>
                              <ChipComponent>
                                <LabelComponent inverted={true}>
                                  {service.orderStatus}
                                </LabelComponent>
                              </ChipComponent>
                            </DescriptionContainer>
                          </ListCard>
                        </ListContainer>
                      );
                    }
                  });
                }
                return (
                  <ListContainer
                    onPress={async () => {
                      await setSelectedCar(item);
                      navigation.navigate("Service");
                    }}
                  >
                    <ListCard>
                      <ListComponent>
                        <CarDescription>
                          <LabelComponent>
                            {item.carMake} {item.carModel}
                          </LabelComponent>
                          <LabelComponent title2={true}>
                            Start service
                          </LabelComponent>
                        </CarDescription>
                        <RedirectIcon width={24} height={24} />
                      </ListComponent>
                      <CarImageContainer>
                        <CarImage source={{ uri: item.carImage.imageLink }} />
                      </CarImageContainer>
                    </ListCard>
                  </ListContainer>
                );
              })}
            <ListContainer
              style={{
                height: 250,
              }}
            />
          </ScrollView>
        </ScrollViewContainer>
      </HomeContainer>
    </MainContainer>
  );
};
