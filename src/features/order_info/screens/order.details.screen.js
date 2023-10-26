import React, { useContext, useEffect, useState } from "react";
import { MainContainer } from "../../../components/main.container.component";
import { LabelComponent } from "../../../components/typography/label.component";
import { LabelFormComponent as Label } from "../../../components/typography/label.form.component";
import styled from "styled-components/native";
import { Spacer } from "../../../components/utils/spacer.component";
import { AvatarComponent } from "../../../components/utils/avatar.component";
import CalendarIcon from "../../../../assets/svgs/calendar";
import { ButtonComponent } from "../../../components/button.component";
import { CustomerContext } from "../../../infrastructure/service/customer/context/customer.context";
import { ServiceContext } from "../../../infrastructure/service/create_service/context/service.context";
import { format } from "date-fns";
import { ValetContainer } from "../../../components/valet.container.component";
import LogOutIcon from "../../../../assets/svgs/logout";
import { isObjEmpty } from "../../main/screen/main.screen";

const InfoContainer = styled.View`
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.View`
  width: 54px;
  height: 54px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

const AvatarImage = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 20px;
`;

const UserInfoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100px;
`;

const UserProfileContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Chip = styled.View`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 12px;
  padding-right: 12px;
  dipaly: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: rgba(99, 163, 117, 0.36);
`;

export const OrderDetailsScreen = ({ navigation }) => {
  const { profile } = useContext(CustomerContext);
  const {
    selectedOrder,
    getValet,
    getValetLoading,
    getValetData,
    getValetError,
    valet,
    setValet,
  } = useContext(ServiceContext);
  const [showValetBtn, setShowValetBtn] = useState(false);

  useEffect(() => {
    getValet({
      variables: {
        orderId: selectedOrder.orderId,
      },
    });
  }, []);

  useEffect(() => {
    if (!getValetLoading) {
      console.log("getValetData", selectedOrder);
      if (!isObjEmpty(getValetData)) {
        setValet(getValetData);
        setShowValetBtn(true);
      }
    }
  }, [getValetLoading]);

  useEffect(() => {
    console.log("getValetError", getValetError);
    if (getValetError) {
      setShowValetBtn(false);
    }
  }, [getValetError]);

  return (
    <ValetContainer>
      <InfoContainer>
        <Spacer variant="top.large" />
        <LabelComponent>Your Info</LabelComponent>
        <AvatarContainer>
          <UserProfileContainer>
            <Avatar>
              <AvatarImage
                source={{
                  uri: profile.profilePicture.pictureLink,
                }}
              />
            </Avatar>
            <Spacer variant="left.medium" />
            <UserInfoContainer>
              <LabelComponent>
                {profile.firstName} {profile.lastName}
              </LabelComponent>
              <Spacer variant="top.small" />
              <Chip>
                <LabelComponent
                  styles={{
                    fontSize: 12,
                  }}
                  title2={true}
                >
                  {profile.accountType.toUpperCase()}
                </LabelComponent>
              </Chip>
            </UserInfoContainer>
          </UserProfileContainer>
          <UserInfoContainer>
            <LabelComponent
              styles={{
                fontSize: 12,
              }}
              title2={true}
            >
              Order Status
            </LabelComponent>
            <Spacer variant="left.medium" />
            <Chip>
              <LabelComponent
                styles={{
                  fontSize: 12,
                }}
                title2={true}
              >
                {selectedOrder.orderStatus.toUpperCase()}
              </LabelComponent>
            </Chip>
          </UserInfoContainer>
        </AvatarContainer>
        <Spacer variant="top.large" />
        <LabelComponent>Requested Service</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>
          {selectedOrder.serviceType.servicePackageName}
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent>Service Delivery Date</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>
          {format(
            new Date(selectedOrder.orderDeliveryDate),
            "EEE, MMM dd yyyy"
          )}
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent>Pick-up Location</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>
          {selectedOrder.pickupLocation}
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent>Vehicle Info</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>
          {selectedOrder.vehicle.carMake} {selectedOrder.vehicle.carModel}
        </LabelComponent>
        <LabelComponent title2={true}>
          {selectedOrder.vehicle.plateNumber}
        </LabelComponent>

        <Spacer variant="top.large" />
        {showValetBtn && (
          <ButtonComponent
            title="View Valet Info"
            onPress={() => navigation.navigate("Valet")}
          >
            <LogOutIcon width={24} height={24} />
          </ButtonComponent>
        )}
      </InfoContainer>
    </ValetContainer>
  );
};
