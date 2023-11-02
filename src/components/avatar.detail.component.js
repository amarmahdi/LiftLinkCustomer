import React from "react";
import styled from "styled-components/native";
import { Spacer } from "./utils/spacer.component";
import { LabelComponent } from "./typography";
import { ChipComponent } from "./utils/chip.component";

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

export const AvatarDetailComponent = ({ profileImage, firstName, lastName }) => {
  return (
    <AvatarContainer>
      <UserProfileContainer>
        <Avatar>
          <AvatarImage
            source={{
              uri: profileImage,
            }}
          />
        </Avatar>
        <Spacer variant="left.medium" />
        <UserInfoContainer>
          <LabelComponent>
            {firstName} {lastName}
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
  );
};
