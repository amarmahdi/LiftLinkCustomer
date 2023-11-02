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
import { ChipComponent } from "../../../components/utils/chip.component";

const InfoContainer = styled.View`
  flex-direction: column;
  width: 100%;
  padding-top: 40px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
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

export const OrderDetailsScreen = ({ navigation }) => {
  const { profile } = useContext(CustomerContext);
  const {
    selectedOrder,
    // get valet
    // get valet
    onGetValet,
    valet,
    valetLoading,
    valetError,
    valetErrorMsg,
    // get assigned order
    onGetAssignedOrder,
    assignedOrder,
    setAssignedOrder,
    assignedOrderLoading,
    assignedOrderError,
  } = useContext(ServiceContext);
  const [showValetBtn, setShowValetBtn] = useState(false);

  useEffect(() => {
    if (!isObjEmpty(selectedOrder) && isObjEmpty(valet)) {
      onGetValet(selectedOrder.orderId);
      onGetAssignedOrder(selectedOrder.orderId);
    }
  }, []);

  useEffect(() => {
    if (valetError) {
      console.log("error", valetErrorMsg);
    }
  }, [valetError]);

  useEffect(() => {
    console.log(valetLoading, "############");
  }, [valetLoading]);

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
              <ChipComponent>
                <LabelComponent
                  styles={{
                    fontSize: 12,
                  }}
                  title2={true}
                >
                  {profile.accountType.toUpperCase()}
                </LabelComponent>
              </ChipComponent>
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
            <ChipComponent>
              <LabelComponent
                styles={{
                  fontSize: 12,
                }}
                title2={true}
              >
                {selectedOrder.orderStatus.toUpperCase()}
              </LabelComponent>
            </ChipComponent>
          </UserInfoContainer>
        </AvatarContainer>
        <Spacer variant="top.large" />
        <LabelComponent>Dealership</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>
          #{selectedOrder.dealership.dealershipName}
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent>Requested Service</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>
          #{selectedOrder.serviceType.servicePackageName}
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent>Service Delivery Date</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>
          #
          {format(
            new Date(selectedOrder.orderDeliveryDate),
            "EEE, MMM dd yyyy"
          )}
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent>Note</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>#{selectedOrder.notes}</LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent>Pick-up Location</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>
          #{selectedOrder.pickupLocation}
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent>Vehicle Info</LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent title2={true}>
          #{selectedOrder.vehicle.carMake} {selectedOrder.vehicle.carModel}
        </LabelComponent>
        <LabelComponent title2={true}>
          #{selectedOrder.vehicle.plateNumber}
        </LabelComponent>
        <Spacer variant="top.large" />
        {valetLoading && (
          <>
            <LabelComponent title2={true}>
              Fetching valet service data...
            </LabelComponent>
          </>
        )}
        {!valetLoading && !isObjEmpty(valet) && (
          <>
            <LabelComponent title={true}>Valet Service Info</LabelComponent>
            <Spacer variant="top.large" />
            <LabelComponent>Valet Status</LabelComponent>
            <Spacer variant="top.medium" />
            <ChipComponent>
              <LabelComponent title2={true} inverted={true}>
                {valet.valetStatus.split("_").join(" ")}
              </LabelComponent>
            </ChipComponent>
            <Spacer variant="top.large" />
            <ButtonComponent
              title="Valet Details"
              onPress={() => navigation.navigate("ValetDetails")}
            >
              <LogOutIcon width={24} height={24} />
            </ButtonComponent>
          </>
        )}
        <Spacer variant="top.large" />
      </InfoContainer>
    </ValetContainer>
  );
};
