import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { InputComponent } from "../../../components/input.component";
import { ServiceContext } from "../../../infrastructure/service/create_service/context/service.context";
import { ButtonComponent } from "../../../components/button.component";
import { LabelComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { CustomerContext } from "../../../infrastructure/service/customer/context/customer.context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import ProceedSvg from "../../../../assets/svgs/proceed";
import DateSvg from "../../../../assets/svgs/date";
import { OverlayComponent } from "../../../components/overlay.component";
import { AvatarDetailComponent } from "../../../components/avatar.detail.component";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { theme } from "../../../infrastructure/theme";

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
  const [loanerCarRequest, setLoanerCarRequest] = useState(null);
  const [noteError, setNoteError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [loanerCarRequestError, setLoanerCarRequestError] = useState("");
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

    if (!loanerCarRequest) {
      setLoanerCarRequestError("Loadner car request is required");
      isValid = false;
    } else {
      setLoanerCarRequestError("");
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
          valetVehicleRequest: loanerCarRequest,
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
      <Container keyboardShouldPersistTaps="handled">
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
        >
          <InfoContainer>
            <LabelComponent>Primary Information</LabelComponent>
            <Spacer variant="top.medium" />
            <AvatarDetailComponent
              profileImage={profile.profilePicture.pictureLink}
              firstName={profile.firstName}
              lastName={profile.lastName}
            />
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
              multiline={true}
              onChangeText={(text) => setNote(text)}
              isError={noteError !== ""}
              errorText={noteError}
            />
            <Spacer variant="top.large" />
            <LabelComponent>Service Date</LabelComponent>
            <Spacer variant="top.small" />

            <DateTimePickerContainer
              onPress={() => setShowDateTimePicker(!showDateTimePicker)}
            >
              {showDateTimePicker && renderDateTimePicker()}
              <LabelComponent title2={true}>
                {date.toDateString()}
              </LabelComponent>
              <DateSvg width={24} height={24} />
            </DateTimePickerContainer>
            <Spacer variant="top.large" />
            <LabelComponent>Service Location/Address</LabelComponent>
            <Spacer variant="top.small" />
            {/* <InputComponent
              label=""
              placeholder="Service Location/Address"
              value={location}
              onChangeText={(text) => setLocation(text)}
              isError={locationError !== ""}
              errorText={locationError}
            /> */}
            <GooglePlacesAutocomplete
              placeholder="Pick Up Location/Address"
              onPress={(data, details = null) => {
                setLocation(details.description);
              }}
              query={{
                key: "AIzaSyCQ_V0ZfCs0h_ruPXAUhpkh8P-IK89P_LM",
                language: "en",
                components: "country:ca",
              }}
              enablePoweredByContainer={false}
              enableHighAccuracyLocation={true}
              debounce={500}
              listUnderlayColor={theme.colors.bg.secondary}
              listLoaderComponent={() => (
                <LabelComponent>Loading...</LabelComponent>
              )}
              listHoverColor={theme.colors.bg.secondary}
              listEmptyComponent={() => (
                <LabelComponent>No results found</LabelComponent>
              )}
              inbetweenComponent={() => <Spacer variant="top.large" />}
              styles={{
                container: {
                  flex: 0,
                  width: "100%",
                  height: 60,
                  borderWidth: 1,
                  borderColor: theme.colors.formColors.border,
                  borderRadius: theme.borderRadiuses[3],
                },
                textInput: {
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                },
                listView: {
                  position: "absolute",
                  top: 60,
                  borderWidth: 1,
                  borderColor: theme.colors.formColors.border,
                  borderRadius: theme.borderRadiuses[3],
                  backgroundColor: theme.colors.bg.primary,
                  zIndex: 99999999,
                  width: "100%",
                },
                textInputContainer: {
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                },
                separator: {
                  height: 1,
                  backgroundColor: theme.colors.bg.secondary,
                },
              }}
            />
            <Spacer variant="top.large" />
            <LabelComponent>Need Loaner Vehicle?</LabelComponent>
            <Spacer variant="top.small" />
            {location !== "" && (
              <Picker
                selectedValue={loanerCarRequest}
                onValueChange={(itemValue, itemIndex) =>
                  setLoanerCarRequest(itemValue)
                }
                mode="dropdown"
              >
                <Picker.Item label="Select Yes/No" value={null} />
                <Picker.Item label="Yes" value={true} />
                <Picker.Item label="No" value={false} />
              </Picker>
            )}
            {!loanerCarRequestError && (
              <ErrorText>{loanerCarRequestError}</ErrorText>
            )}
            <Spacer variant="top.large" />
            <ButtonComponent title="Next" onPress={handleServiceDetails}>
              <ProceedSvg isIcon={true} width={24} height={24} />
            </ButtonComponent>
          </InfoContainer>
        </KeyboardAvoidingView>
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
