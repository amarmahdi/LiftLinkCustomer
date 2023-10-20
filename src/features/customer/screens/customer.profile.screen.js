/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { LabelComponent as Label } from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
import styled from "styled-components/native";
import RedirectIcon from "../../../../assets/svgs/redirect";
import { Container } from "../../../components/utils/container.component";
import { ButtonComponent } from "../../../components/button.component";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../../../../firebase-config";
import { CustomerProfileContext } from "../../../infrastructure/service/customer/context/customer.profile.context";
import { useMutation } from "@apollo/client";
import { UPLOAD_PROFILE_PICTURE } from "../../../infrastructure/service/mutation";
import { CamCardComponent } from "../components/camera.card.component";
import { ImageContainerContext } from "../utils/imageObjectContainer";

const ScrollViewContainer = styled.ScrollView`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
`;

const ImageUploadContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  border: 1px solid ${(props) => props.theme.colors.bg.secondary};
  border-radius: 20px;
  gap: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.buttonColors.primary};
  border-radius: 20px;
  padding: 10px 40px 10px 40px;
  gap: 10px;
  widht: 100%;
`;

const ButtonLabel = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ProfilePicture = styled.Image`
  height: 100%;
  border-radius: 20px;
`;

export const CustomerProfileScreen = ({ navigation }) => {
  const { setPage, profile, profileLoading } = useContext(
    CustomerProfileContext
  );
  const { imageObject, clearImageObject } = useContext(ImageContainerContext);
  const [uploadImage] = useMutation(UPLOAD_PROFILE_PICTURE);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    console.log("handleUpload");
    const imageKey = `object_${Object.keys(imageObject).length - 1}`;
    const fileName = imageObject[imageKey].substring(
      imageObject[imageKey].lastIndexOf("/") + 1
    );
    try {
      const data = await uploadToFirebase(
        imageObject[imageKey],
        `profiles/${fileName}`,
        (progress) => {
          setProgress(progress);
        }
      );
      console.log("data", data);

      await uploadImage({
        variables: {
          pictureLink: data.url,
        },
      })
        .then(() => {
          clearImageObject();
          setPage("CustomerCarInfo");
        })
        .catch((error) => {
          console.log(error, "error from uploadImage#############");
        });
    } catch (error) {
      console.log(error, "error from handleUpload");
    }
  };

  return (
    <ScrollViewContainer>
      <Container
        styles={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Spacer variant="top.large" />
        <Label title2={true}>
          Enter the required information mentioned down below.
        </Label>
        <Spacer variant="top.medium" />
        <Label>Profile Image</Label>
        <Label>{progress.toLocaleString(1)}</Label>
        <Spacer variant="top.small" />
        <CamCardComponent />
        <Spacer variant="top.small" />
        <Label title2={true}>Click to add image.</Label>
      </Container>
      <Spacer variant="top.large" />
      <ButtonComponent
        title="Next"
        onPress={async () => {
          if (
            typeof imageObject !== "undefined" &&
            Object.keys(imageObject).length !== 0
          ) {
            await handleUpload();
          } else {
            setPage("CustomerCarInfo");
            clearImageObject();
          }
        }}
        icon={<RedirectIcon width={24} height={24} />}
      />
    </ScrollViewContainer>
  );
};
