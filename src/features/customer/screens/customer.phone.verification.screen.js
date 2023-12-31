import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { LabelFormComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";
import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifier,
  FirebaseRecaptcha,
  FirebaseRecaptchaVerifierModal,
} from "expo-firebase-recaptcha";
import { fbApp, fbAuth, fbOtp } from "../../../../firebase-config";
import { ButtonComponent } from "../../../components/button.component";
import RedirectIcon from "../../../../assets/svgs/redirect";
import firebase, {
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { OverlayComponent } from "../../../components/overlay.component";
import { Keyboard } from "react-native";
import { screens } from "../customer.screen";
import { CustomerContext } from "../../../infrastructure/service/customer/context/customer.context";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const PositionedButtonComponent = styled(ButtonComponent)`
  position: absolute;
  bottom: 250px;
  width: 100%;
`;

export const CustomerPhoneVerificationScreen = ({ navigation }) => {
  const { phone, setPhone, phoneError, setPhoneError, updatePhoneMutation } =
    useContext(AuthContext);
  const { setScreen } = useContext(CustomerContext);
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [message, showMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showCodeVerification, setShowCodeVerification] = useState(false);

  useEffect(() => {
    if (verificationId) {
      setShowCodeVerification(true);
    }
  }, [verificationId]);

  return (
    <>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={fbApp.options}
        title="Prove you are human!"
        cancelLabel="Close"
        containerStyle={{
          width: "100%",
          height: "100%",
          marginTop: "70%",
        }}
      />
      {!showCodeVerification && (
        <Container>
          <Spacer variant="top.large" />
          <LabelFormComponent size={"100%"}>Phone</LabelFormComponent>
          <Spacer variant="top.xsmall" />
          <InputComponent
            value={phone}
            onChangeText={(text) => {
              if (text.length === 0) {
                setPhoneError(true);
              }
              if (text.length > 0 && phoneError) {
                setPhoneError(false);
              }
              setPhone(text);
            }}
            isError={phoneError}
            placeholder="+1 999 999 9999"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
          {phoneError && <ErrorText>Phone required</ErrorText>}
          {message ? (
            <ErrorText>{message}</ErrorText>
          ) : (
            <FirebaseRecaptchaBanner />
          )}
          <Spacer variant="top.small" />
          <Spacer variant="top.small" />
          <ButtonComponent
            absolute={true}
            title="Next"
            onPress={async () => {
              Keyboard.dismiss();
              await fbOtp(phone, recaptchaVerifier).then((verificationId) => {
                setVerificationId(verificationId);
              });
            }}
          >
            <RedirectIcon width={24} height={24} />
          </ButtonComponent>
        </Container>
      )}
      {showCodeVerification && (
        <Container>
          <Spacer variant="top.large" />
          <LabelFormComponent size={"100%"}>Code</LabelFormComponent>
          <Spacer variant="top.xsmall" />
          <InputComponent
            value={verificationCode}
            onChangeText={(text) => {
              setVerificationCode(text);
            }}
            placeholder="123456"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
          {message ? (
            <ErrorText>{message}</ErrorText>
          ) : (
            <FirebaseRecaptchaBanner />
          )}
          <Spacer variant="top.small" />
          <Spacer variant="top.small" />
          <ButtonComponent
            absolute={true}
            title="Next"
            onPress={async () => {
              Keyboard.dismiss();
              const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              await signInWithCredential(fbAuth, credential)
                .then(async (result) => {
                  console.log(result, "from phone verification");
                  await updatePhoneMutation(phone);
                  setScreen(screens.names);
                })
                .catch((error) => {
                  console.error(error, "from phone verification");
                  showMessage(error.message);
                });
            }}
          >
            <RedirectIcon width={24} height={24} />
          </ButtonComponent>
        </Container>
      )}
    </>
  );
};
