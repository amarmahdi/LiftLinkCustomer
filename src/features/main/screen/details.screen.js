import React from "react";
import { MainContainer } from "../../../components/main.container.component";
import { LabelComponent } from "../../../components/typography/label.component";
import { LabelFormComponent as Label } from "../../../components/typography/label.form.component";
import styled from "styled-components/native";
import { Spacer } from "../../../components/utils/spacer.component";
import { AvatarComponent } from "../../../components/utils/avatar.component";
import CalendarIcon from "../../../../assets/svgs/calendar";
import { ButtonComponent } from "../../../components/button.component";

const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding-top: ${(props) => props.theme.buttonSizes.screen.height / 4}px;
`;

const DetailContainer = styled.View`
  width: ${(props) => props.theme.buttonSizes.screen.width}px;
  height: ${(props) => props.theme.buttonSizes.screen.height}px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-top: ${(props) => props.theme.lineHeights.copy};
  border-width: 1px;
  border-radius: 40px;
  border-color: ${(props) => props.theme.colors.formColors.border};
  shadow-color: ${(props) => props.theme.colors.text.primary};
  shadow-offset: 0px 1px;
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 5;
  padding: 20px;
  padding-top: 80px;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-bottom: 70px;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const CarImg = styled.Image`
  position: absolute;
  top: 100px;
  z-index: 1;
`;

const ProfileContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UsernameContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
`;

const ServiceList = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;


export const DetailsScreen = ({ navigation }) => {
  return (
    <MainContainer showAvatar={true} showMenu={true}>
      <ScrollViewContainer vertical={true}>
        <Container>
          <LabelComponent title={true} inverted={true}>Genesis Model G90 2023</LabelComponent>
          <LabelComponent title2={true} inverted={true}>All Wheel Drive Long Wheel Sedan</LabelComponent>
          <Spacer variant="top.large" />
          <Spacer variant="top.large" />
          <CarImg
            source={require("../../../../assets/genesis-car-img.png")}
          />
          <DetailContainer>
            <Label size={30}>Requested Service</Label>
            <Spacer variant="top.medium" />
            <ProfileContainer>
              <UserInfoContainer>
                <AvatarComponent
                  height={80}
                  width={80}
                  fullName='Amar Mahdi'
                />
                <Spacer variant="left.small" />
                <UsernameContainer>
                  <Label size={20}>Amar Mahdi</Label>
                  <Label size={20}>+1 234 567 890</Label>
                </UsernameContainer>
              </UserInfoContainer>
              <UserInfoContainer>
                <Label size={20}>Pickup Location</Label>
              </UserInfoContainer>
            </ProfileContainer>
            <Spacer variant="top.large" />
            <Label size={20}>Requested Service</Label>
            <Spacer variant="top.medium" />
            <ServiceList>
              <Label size={20}>Oil Change</Label>
              <Spacer variant="left.large" />
              <Label size={20}>Tire Rotation</Label>
              <Spacer variant="left.large" />
              <Label size={20}>Tire Rotation</Label>
              <Spacer variant="left.large" />
              <Label size={20}>Tire Rotation</Label>
            </ServiceList>
            <Spacer variant="top.large" />
            <Label size={20}>Service Delivery Date</Label>
            <Spacer variant="top.medium" />
            <DateContainer>
              <CalendarIcon width={24} height={24} />
              <Spacer variant="left.small" />
              <Label size={20}>Monday, 20th September 2021</Label>
            </DateContainer>
            <Spacer variant="top.large" />
            <Label size={20}>Pick-up Location</Label>
            <Spacer variant="top.medium" />
            <DateContainer>
              <CalendarIcon width={24} height={24} />
              <Spacer variant="left.small" />
              <Label size={20}>Monday, 20th September 2021</Label>
            </DateContainer>
            <Spacer variant="top.large" />
            <Spacer variant="top.large" />
            <ButtonComponent
              title="Customer Car Details"
              onPress={() => navigation.navigate("Customer")}
            />
            <Spacer variant="top.large" />
            <Spacer variant="top.large" />
            <Spacer variant="top.large" />
          </DetailContainer>
        </Container>
      </ScrollViewContainer>
    </MainContainer>
  );
}