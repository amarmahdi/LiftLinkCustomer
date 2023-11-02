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
import { CustomerContext } from "../../../infrastructure/service/customer/context/customer.context";
import { useMutation } from "@apollo/client";
import { UPLOAD_PROFILE_PICTURE } from "../../../infrastructure/service/mutation";
import { CamCardComponent } from "../components/camera.card.component";
import { ImageContainerContext } from "../utils/imageObjectContainer";
import { screens } from "../customer.screen";

const ScrollViewContainer = styled.ScrollView`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
`;

export const CustomerProfileScreen = ({ navigation }) => {
  const { profile, profileLoading, setScreen } = useContext(CustomerContext);
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
          setScreen(screens.carInfo);
        })
        .catch((error) => {
          console.log(error, "error from uploadImage#############");
        });
    } catch (error) {
      console.log(error, "error from handleUpload");
    }
  };

  return (
    <>
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
      </ScrollViewContainer>
      <ButtonComponent
        absolute={true}
        title="Next"
        onPress={async () => {
          if (
            typeof imageObject !== "undefined" &&
            Object.keys(imageObject).length !== 0
          ) {
            await handleUpload();
          } else {
            setScreen(screens.carInfo);
            clearImageObject();
          }
        }}
      >
        <RedirectIcon width={24} height={24} />
      </ButtonComponent>
    </>
  );
};
