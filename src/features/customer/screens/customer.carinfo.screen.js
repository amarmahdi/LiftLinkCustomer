/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from "react";
import { LabelComponent as Label } from "../../../components/typography/label.component";
import { MainContainer } from "../../../components/main.container.component";
import { Alert, Platform, ScrollView } from "react-native";
import { Spacer } from "../../../components/utils/spacer.component";
import { CamCardComponent } from "../components/camera.card.component";
import { ButtonComponent } from "../../../components/button.component";
import styled from "styled-components/native";
import { ScrollViewComponent } from "react-native";
import { ImageContainerContext } from "../utils/imageObjectContainer";
import { uploadToFirebase } from "../../../../firebase-config";
import { InputComponent } from "../../../components/input.component";
import { LabelFormComponent } from "../../../components/typography/label.form.component";
import { Add_CAR_INFO } from "../../../infrastructure/service/mutation";
import { useMutation } from "@apollo/client";

const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
`;

const ScrollViewContainer = styled.ScrollView`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 60px;
`;

const IncrementBtn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.colors.bg.secondary};
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled.Text`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ErrorMessage = styled.Text`
  color: ${(props) => props.theme.colors.text.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.title2};
`;

const ButtonContainer = styled.View`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  position: absolute;
  bottom: 20px;
`;

export const CustomerCarInfoScreen = ({ navigation }) => {
  const [count, setCount] = useState([0]);
  const [progress, setProgress] = useState([0]);
  const { imageObject, setImageObject, clearImageObject } = useContext(
    ImageContainerContext
  );
  const [uploadImage, { loading }] = useMutation(Add_CAR_INFO);
  const [make, setMake] = useState([""]);
  const [model, setModel] = useState([""]);
  const [year, setYear] = useState([""]);
  const [vin, setVin] = useState([""]);
  const [plateNumber, setPlateNumber] = useState([""]);
  const [mileage, setMileage] = useState([""]);
  const [insurance, setInsurance] = useState([""]);
  const [error, setError] = useState([false]);
  const [imgError, setImgError] = useState(false);

  const handleInput = (e, index, arr) => {
    return [...arr.slice(0, index), e, ...arr.slice(index + 1)];
  };

  const uploadImages = async () => {
    for (let i = 0; i < count.length; i++) {
      if (Object.keys(imageObject).length === 0) {
        Alert.alert("Please take a picture");
        break;
      }
      if (make[i] === "") {
        console.log("error");
        setError([...error.slice(0, i), true, ...error.slice(i + 1)]);
        break;
      }
      if (model[i] === "") {
        setError([...error.slice(0, i), true, ...error.slice(i + 1)]);
        break;
      }
      if (year[i] === "") {
        setError([...error.slice(0, i), true, ...error.slice(i + 1)]);
        break;
      }
      if (vin[i] === "") {
        setError([...error.slice(0, i), true, ...error.slice(i + 1)]);
        break;
      }
      if (plateNumber[i] === "") {
        setError([...error.slice(0, i), true, ...error.slice(i + 1)]);
        break;
      }
      if (mileage[i] === "") {
        setError([...error.slice(0, i), true, ...error.slice(i + 1)]);
        break;
      }
      if (insurance[i] === "") {
        setError([...error.slice(0, i), true, ...error.slice(i + 1)]);
        break;
      }

      const imgObjItem = Object.keys(imageObject)[i];

      const data = await handleUpload(imageObject[imgObjItem], i);
      const datas = {
        available: true,
        carImage: data,
        carColor: "yellow",
        carInsurance: insurance[i],
        carMake: make[i],
        carModel: model[i],
        carName: "Genessis",
        carRegistration: "123456789",
        carType: "Genessis",
        carVin: vin[i],
        carYear: year[i],
        mileage: mileage[i],
        plateNumber: plateNumber[i],
        status: "good",
      };

      const uploadData = await uploadImage({
        variables: {
          input: datas,
        },
      });

      if (uploadData) {
        clearImageObject();
        navigation.navigate("Home");
      } else {
        Alert.alert("Something went wrong");
      }
    }
  };

  const increment = () => {
    setCount([...count, count[count.length - 1] + 1]);
    setProgress([...progress, 0]);
    setMake([...make, ""]);
    setModel([...model, ""]);
    setYear([...year, ""]);
    setVin([...vin, ""]);
    setPlateNumber([...plateNumber, ""]);
    setMileage([...mileage, ""]);
    setInsurance([...insurance, ""]);
    setError([...error, false]);
  };

  const decrement = (key, index) => {
    setCount(count.filter((item) => item !== key));
    setProgress(progress.filter((item, ind) => ind !== index));
    setMake(make.filter((item, ind) => ind !== index));
    setModel(model.filter((item, ind) => ind !== index));
    setYear(year.filter((item, ind) => ind !== index));
    setVin(vin.filter((item, ind) => ind !== index));
    setPlateNumber(plateNumber.filter((item, ind) => ind !== index));
    setMileage(mileage.filter((item, ind) => ind !== index));
    setInsurance(insurance.filter((item, ind) => ind !== index));
    setError(error.filter((item, ind) => ind !== index));
  };

  useEffect(() => {
    console.log(count);
  }, [count]);

  const handleUpload = async (image, index) => {
    const fileName = image.substring(image.lastIndexOf("/") + 1);
    const data = await uploadToFirebase(
      image,
      `customer_cars/${fileName}`,
      (progress) => {
        const progressPercent = Math.round(
          (progress.loaded / progress.total) * 100
        );
        setProgress([
          ...progress.slice(0, index),
          progressPercent,
          ...progress.slice(index + 1),
        ]);
      }
    );
    return data.url;
  };

  useEffect(() => {
    console.log(make, "make");
  }, [make]);

  useEffect(() => {
    console.log(error, "error");
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <>
        <ScrollViewContainer>
          <Container
            styles={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          ></Container>
          <>
            <Spacer variant="top.large" />
            <Label title2={true}>Loaner Car: All Side Picture</Label>
            <Spacer variant="top.medium" />
            <ScrollView>
              {count.map((item, index) => {
                return (
                  <>
                    <Spacer variant="top.large" />
                    <Spacer variant="top.large" />
                    <StyledText>{progress[index]}</StyledText>
                    <Spacer variant="top.large" />
                    {count.length > 1 && (
                      <IncrementBtn onPress={() => decrement(item, index)}>
                        <ButtonLabel style={{ color: "red" }}>X</ButtonLabel>
                      </IncrementBtn>
                    )}
                    <Spacer variant="top.small" />
                    <CamCardComponent _key={item + "_" + index} />
                    <Spacer variant="top.large" />
                    <LabelFormComponent size={"100%"}>
                      Car Make
                    </LabelFormComponent>
                    <Spacer variant="top.small" />
                    <InputComponent
                      placeholder="Enter Car Make"
                      onChangeText={(e) => setMake(handleInput(e, item, make))}
                    />
                    <Spacer variant="top.small" />
                    <ErrorMessage>
                      {make[index] === "" && error[index]
                        ? "This field is required"
                        : ""}
                    </ErrorMessage>
                    <Spacer variant="top.large" />
                    <LabelFormComponent size={"100%"}>
                      Car Model
                    </LabelFormComponent>
                    <Spacer variant="top.small" />
                    <InputComponent
                      placeholder="Enter Car Model"
                      onChangeText={(e) =>
                        setModel(handleInput(e, item, model))
                      }
                    />
                    <Spacer variant="top.small" />
                    <ErrorMessage>
                      {model[index] === "" && error[index]
                        ? "This field is required"
                        : ""}
                    </ErrorMessage>
                    <Spacer variant="top.large" />
                    <LabelFormComponent size={"100%"}>
                      Car Year
                    </LabelFormComponent>
                    <Spacer variant="top.small" />
                    <InputComponent
                      placeholder="Enter Car Year"
                      onChangeText={(e) => setYear(handleInput(e, item, year))}
                    />
                    <Spacer variant="top.small" />
                    <ErrorMessage>
                      {year[index] === "" && error[index]
                        ? "This field is required"
                        : ""}
                    </ErrorMessage>
                    <Spacer variant="top.large" />
                    <LabelFormComponent size={"100%"}>
                      Car Vin
                    </LabelFormComponent>
                    <Spacer variant="top.small" />
                    <InputComponent
                      placeholder="Enter Car Vin"
                      onChangeText={(e) => setVin(handleInput(e, item, vin))}
                    />
                    <Spacer variant="top.small" />
                    <ErrorMessage>
                      {vin[index] === "" && error[index]
                        ? "This field is required"
                        : ""}
                    </ErrorMessage>
                    <Spacer variant="top.large" />
                    <LabelFormComponent size={"100%"}>
                      Car Plate Number
                    </LabelFormComponent>
                    <Spacer variant="top.small" />
                    <InputComponent
                      placeholder="Enter Car Plate Number"
                      onChangeText={(e) =>
                        setPlateNumber(handleInput(e, item, plateNumber))
                      }
                    />
                    <Spacer variant="top.small" />
                    <ErrorMessage>
                      {plateNumber[index] === "" && error[index]
                        ? "This field is required"
                        : ""}
                    </ErrorMessage>
                    <Spacer variant="top.large" />
                    <LabelFormComponent size={"100%"}>
                      Car Mileage
                    </LabelFormComponent>
                    <Spacer variant="top.small" />
                    <InputComponent
                      placeholder="Enter Car Mileage"
                      onChangeText={(e) =>
                        setMileage(handleInput(e, item, mileage))
                      }
                    />
                    <Spacer variant="top.small" />
                    <ErrorMessage>
                      {mileage[index] === "" && error[index]
                        ? "This field is required"
                        : ""}
                    </ErrorMessage>
                    <Spacer variant="top.large" />
                    <LabelFormComponent size={"100%"}>
                      Car Insurance
                    </LabelFormComponent>
                    <Spacer variant="top.small" />
                    <InputComponent
                      placeholder="Enter Car Insurance"
                      onChangeText={(e) =>
                        setInsurance(handleInput(e, item, insurance))
                      }
                    />
                    <Spacer variant="top.small" />
                    <ErrorMessage>
                      {insurance[index] === "" && error[index]
                        ? "This field is required"
                        : ""}
                    </ErrorMessage>
                    <Spacer variant="top.large" />
                  </>
                );
              })}
              <IncrementBtn onPress={increment}>
                <ButtonLabel>+</ButtonLabel>
              </IncrementBtn>
              <Spacer variant="top.large" />
            </ScrollView>
          </>
        </ScrollViewContainer>
        <ButtonContainer>
          <ButtonComponent title="Next" onPress={() => uploadImages()} />
        </ButtonContainer>
      </>
    </KeyboardAvoidingView>
  );
};
