import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { InputComponent } from "../../../components/input.component";
import { ServiceContext } from "../../../infrastructure/service/create_service/context/service.context";
import { isObjEmpty } from "../../main/screen/main.screen";
import { ButtonComponent } from "../../../components/button.component";
import { MainContainer } from "../../../components/main.container.component";
import { LabelComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { CustomerContext } from "../../../infrastructure/service/customer/context/customer.context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import ProceedSvg from "../../../../assets/svgs/proceed";
import DateSvg from "../../../../assets/svgs/date";
import { OverlayComponent } from "../../../components/overlay.component";
import { Platform } from "react-native";
import { ChipComponent } from "../../../components/utils/chip.component";

const Container = styled.ScrollView`
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const InfoContainer = styled.View`
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding-top: 100px;
  padding-left: 30px;
  padding-right: 30px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

const PositionedImage = styled.Image`
  position: absolute;
  top: 230px;
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
  height: 300px;
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

const DateTimePickerInput = styled.TextInput`
  flex: 1;
  color: ${(props) => props.theme.colors.darkText.primary};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

const DateTimePickerContainer = styled.Pressable`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.formColors.border};
  width: 100%;
  height: ${(props) => props.height || "60px"};
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  margin-top: 5px;
`;

export const ServiceDetailsScreen = ({ navigation }) => {
  const {
    selectedServicePackage,
    createOrder,
    orderLoading,
    orderData,
    selectedCar,
    selectedDealership,
  } = useContext(ServiceContext);
  const { profile } = useContext(CustomerContext);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [loadnerCarRequest, setLoadnerCarRequest] = useState(false);
  const [noteError, setNoteError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [loadnerCarRequestError, setLoadnerCarRequestError] = useState("");
  const [showCustomerConfirmation, setShowCustomerConfirmation] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDateTimePicker(false);
    console.log(currentDate);
  };

  const renderDateTimePicker = () => {
    return (
      <RNDateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
        onTouchCancel={() => setShowDateTimePicker(false)}
      />
    );
  };

  const handleServiceDetails = () => {
    let isValid = true;

    if (location.trim() === "") {
      setLocationError("Location is required");
      isValid = false;
    } else {
      setLocationError("");
    }

    if (!loadnerCarRequest) {
      setLoadnerCarRequestError("Loadner car request is required");
      isValid = false;
    } else {
      setLoadnerCarRequestError("");
    }

    if (isValid) {
      setShowCustomerConfirmation(true);
    }
  };

  const onCustomerCancel = () => {
    setShowCustomerConfirmation(false);
  };

  const onCustomerConfirm = async () => {
    await createOrder({
      variables: {
        input: {
          serviceTypeId: selectedServicePackage.servicePackageId,
          pickupLocation: location,
          vehicleId: selectedCar.carId,
          valetVehicleRequest: loadnerCarRequest,
          notes: note,
          orderDeliveryDate: date,
          dealershipId: selectedDealership.dealershipId,
        },
      },
    });
    setShowCustomerConfirmation(false);
    setShowSuccessModal(true);
  };

  const onSuccess = () => {
    setShowSuccessModal(false);
    navigation.navigate("Home");
  };

  return (
    <>
      <Container>
        <HeaderTitleContainer>
          <LabelComponent inverted={true} title={true}>
            Genesis Model G70 2023
          </LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent inverted={true} title2={true}>
            All wheel Drive Long wheel Sedan
          </LabelComponent>
        </HeaderTitleContainer>
        <PositionedImage
          source={require("../../../../assets/genesis-car-img.png")}
        />
        <InfoContainer>
          <LabelComponent>Primary Information</LabelComponent>
          <Spacer variant="top.medium" />
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
                    Pending Order
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
                UID 112233
              </LabelComponent>
              <Spacer variant="left.medium" />
              <LabelComponent
                styles={{
                  fontSize: 12,
                }}
                title2={true}
              >
                5 Reviews
              </LabelComponent>
            </UserInfoContainer>
          </AvatarContainer>
          <Spacer variant="top.medium" />
          <LabelComponent>Service Information</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #{selectedServicePackage.servicePackageName}
          </LabelComponent>
          <Spacer variant="top.xsmall" />
          <LabelComponent title2={true}>
            <LabelComponent>Description</LabelComponent>:{" "}
            {selectedServicePackage.servicePackageDescription}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Note</LabelComponent>
          <Spacer variant="top.small" />
          <InputComponent
            label=""
            placeholder="Anything you want to add?"
            value={note}
            onChangeText={(text) => setNote(text)}
            height={250}
          />
          {noteError !== "" && <ErrorText>{noteError}</ErrorText>}
          <Spacer variant="top.large" />
          <LabelComponent>Service Date</LabelComponent>
          <Spacer variant="top.small" />

          <DateTimePickerContainer
            onPress={() => setShowDateTimePicker(!showDateTimePicker)}
          >
            {showDateTimePicker && renderDateTimePicker()}
            <LabelComponent title2={true}>{date.toDateString()}</LabelComponent>
            <DateSvg width={24} height={24} />
          </DateTimePickerContainer>
          <Spacer variant="top.large" />
          <LabelComponent>Service Location/Address</LabelComponent>
          <Spacer variant="top.small" />
          <InputComponent
            label=""
            placeholder="Service Location/Address"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          {locationError !== "" && <ErrorText>{locationError}</ErrorText>}
          <Spacer variant="top.large" />
          <LabelComponent>Need Loaner Car?</LabelComponent>
          <Spacer variant="top.small" />
          <InputComponent
            label=""
            placeholder="Yes/No"
            onChangeText={(text) => {
              if (text.toLowerCase() === "yes" || text.toLowerCase() === "y") {
                setLoadnerCarRequest(true);
              } else if (
                text.toLowerCase() === "no" ||
                text.toLowerCase() === "n"
              ) {
                setLoadnerCarRequest(false);
              } else {
                setLoadnerCarRequest(null);
              }
            }}
          />
          {loadnerCarRequestError !== "" && (
            <ErrorText>{loadnerCarRequestError}</ErrorText>
          )}
          <Spacer variant="top.large" />
          <ButtonComponent title="Next" onPress={handleServiceDetails}>
            <ProceedSvg isIcon={true} width={24} height={24} />
          </ButtonComponent>
        </InfoContainer>
      </Container>
      {showCustomerConfirmation && (
        <OverlayComponent
          onCancel={onCustomerCancel}
          onConfirm={onCustomerConfirm}
        >
          <LabelComponent title={true}>Confirm</LabelComponent>
          <LabelComponent title2={true}>
            Are you sure you want to place this order?
          </LabelComponent>
        </OverlayComponent>
      )}
      {showSuccessModal && (
        <OverlayComponent onConfirm={onSuccess} btnText={"Finish"}>
          <LabelComponent title={true}>Success!</LabelComponent>
          <LabelComponent title2={true}>
            Your order has been successfully placed.
          </LabelComponent>
        </OverlayComponent>
      )}
    </>
  );
};
