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
import { Alert } from "react-native";
import { OverlayComponent } from "../../../components/overlay.component";
// import { PIXI } from "expo-pixi";
import Signature from "react-native-signature-canvas";
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

const LoanerCarContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const LoanerCarImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const ChecksContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ChecksImg = styled.Image`
  flex: 1;
  width: 100%;
  border-radius: 20px;
  height: 100%;
`;

const CheckLabelContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 47%;
  height: 200px;
`;

const CanvasContainer = styled.View`
  width: 80%;
  height: 60%;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.colors.bg.primary};
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: 20px;
`;

const SignitureCanvas = styled.View`
  width: 100%;
  border-radius: 20px;
  height: 60%;
  border: 1px solid ${(props) => props.theme.colors.bg.secondary};
`;

export const ValetDetailsScreen = ({ navigation }) => {
  const {
    valet,
    selectedOrder,
    onGetAssignedOrder,
    assignedOrder,
    setAssignedOrder,
    assignedOrderLoading,
    assignedOrderError,
    onGetDriverInfo,
    driver,
    driverLoading,
    driverError,
    driverErrorMsg,
  } = useContext(ServiceContext);
  const [showValetBtn, setShowValetBtn] = useState(false);

  useEffect(() => {
    if (isObjEmpty(assignedOrder)) {
      onGetAssignedOrder(selectedOrder.orderId);
    }
  }, []);

  useEffect(() => {
    console.log(assignedOrder, "############???????????");
    if (!isObjEmpty(assignedOrder)) {
      onGetDriverInfo(assignedOrder.acceptedById);
    }
  }, [assignedOrder]);

  useEffect(() => {
    console.log(valet.valetVehicleChecks.mileage, "############>>>>>>>>>>>>>");
  }, [valet]);

  useEffect(() => {
    if (driverError) {
      // Alert.alert("Error", driverErrorMsg);
    }
  }, [driverError]);

  //   useEffect(() => {
  //     console.log(valetLoading, "############");
  //   }, [valetLoading]);

  return (
    <>
      <ValetContainer>
        <InfoContainer>
          <Spacer variant="top.large" />
          <LabelComponent>Driver Info</LabelComponent>
          {driverLoading && <LabelComponent>Loading...</LabelComponent>}
          {!driverLoading && !isObjEmpty(driver) && (
            <AvatarContainer>
              <UserProfileContainer>
                <Avatar>
                  <AvatarImage
                    source={{
                      uri: driver.profilePicture[0].pictureLink,
                    }}
                  />
                </Avatar>
                <Spacer variant="left.medium" />
                <UserInfoContainer>
                  <LabelComponent>
                    {driver.firstName} {driver.lastName}
                  </LabelComponent>
                  <Spacer variant="top.small" />
                  <ChipComponent>
                    <LabelComponent
                      styles={{
                        fontSize: 12,
                      }}
                      title2={true}
                    >
                      {driver.accountType.toUpperCase()}
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
                  Assign Status
                </LabelComponent>
                <Spacer variant="left.medium" />
                <ChipComponent>
                  <LabelComponent
                    styles={{
                      fontSize: 12,
                    }}
                    title2={true}
                  >
                    {assignedOrder.assignStatus.toUpperCase()}
                  </LabelComponent>
                </ChipComponent>
              </UserInfoContainer>
            </AvatarContainer>
          )}
          <Spacer variant="top.large" />
          <LabelComponent>Dealership</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #{selectedOrder.dealership.dealershipName}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent title={true}>Loaner Vehicle Info</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent>Loaner Vehicle Picture</LabelComponent>
          <Spacer variant="top.medium" />
          <LoanerCarContainer>
            <LoanerCarImage
              source={{
                uri: assignedOrder.valetVehicle.carImage.imageLink,
              }}
            />
          </LoanerCarContainer>
          {/* <LabelComponent title2={true}>
          #{selectedOrder.serviceType.servicePackageName}
        </LabelComponent> */}
          <Spacer variant="top.large" />
          <LabelComponent>Loner Vehicle Checks</LabelComponent>
          <Spacer variant="top.medium" />
          <ChecksContainer>
            <CheckLabelContainer>
              <LabelComponent title2={true}>Front</LabelComponent>
              <Spacer variant="top.medium" />
              <ChecksImg
                source={{
                  uri: valet.valetVehicleChecks.frontImage,
                }}
              />
            </CheckLabelContainer>
            <CheckLabelContainer>
              <LabelComponent title2={true}>Back</LabelComponent>
              <Spacer variant="top.medium" />
              <ChecksImg
                source={{
                  uri: valet.valetVehicleChecks.backImage,
                }}
              />
            </CheckLabelContainer>
            <CheckLabelContainer>
              <LabelComponent title2={true}>Left</LabelComponent>
              <Spacer variant="top.medium" />
              <ChecksImg
                source={{
                  uri: valet.valetVehicleChecks.leftImage,
                }}
              />
            </CheckLabelContainer>
            <CheckLabelContainer>
              <LabelComponent title2={true}>Right</LabelComponent>
              <Spacer variant="top.medium" />
              <ChecksImg
                source={{
                  uri: valet.valetVehicleChecks.rightImage,
                }}
              />
            </CheckLabelContainer>
          </ChecksContainer>
          <Spacer variant="top.large" />
          <LabelComponent>Comment</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>#{valet.comments}</LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Mileage</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #{valet.valetVehicleChecks.mileage}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Plate Number</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #{assignedOrder.valetVehicle.plateNumber}
          </LabelComponent>
          <Spacer variant="top.large" />

          <ButtonComponent
            title="See Driver Location"
            onPress={() => navigation.navigate("Map")}
          >
            <LogOutIcon width={24} height={24} />
          </ButtonComponent>
          <Spacer variant="top.large" />
          <Spacer variant="top.large" />
          <ButtonComponent
            title="Finish Valet Service"
            onPress={() => navigation.navigate("Map")}
          >
            <LogOutIcon width={24} height={24} />
          </ButtonComponent>
        </InfoContainer>
      </ValetContainer>
      <OverlayComponent override={true}>
        <CanvasContainer>
          <LabelComponent>Signiture</LabelComponent>
          <Spacer variant="top.large" />
          <SignitureCanvas>
            {/* <ExpoPixi.Sketch
              strokeColor={0x000000}
              strokeAlpha={1}
              strokeWidth={5}
              style={{
                flex: 1,
              }}
            /> */}
            <Signature />
          </SignitureCanvas>
          <ButtonComponent
            absolute={true}
            title="Confirm and Finish"
            onPress={() => navigation.navigate("Map")}
          >
            <LogOutIcon width={24} height={24} />
          </ButtonComponent>
        </CanvasContainer>
      </OverlayComponent>
    </>
  );
};
