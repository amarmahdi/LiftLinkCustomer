/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Container } from "./utils/container.component";
import styled from "styled-components/native";
import Menu from "../../assets/svgs/menu";
import { AvatarComponent } from "./utils/avatar.component";
import { Pressable } from "react-native";

const BodyTitleSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

const LogoSection = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100px;
`;

const LogoTextLight = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.date};
`;

const LogoTextDark = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const HeaderBackground = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
  width: 100%;
  height: ${(props) => (props.showTab ? "220px" : "180px")};
  flex-direction: row;
  z-index: 1;
`;

const TabsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 0;
  gap: 52px;
  padding-bottom: 20px;
`;

export const MainContainer = ({
  children,
  title = "Enhance the Luxury Evolution.",
  showMenu = false,
  showLogo = false,
  showGreetings = false,
  showAvatar = false,
  showTab = false,
  tabs,
  styles,
  imageUrl,
  isLoading = true,
}) => {
  const [tabList, setTabList] = useState(null);

  useEffect(() => {
    if (tabs) {
      setTabList(tabs);
    }
  }, [tabs]);

  return (
    <Container styles={styles}>
      <HeaderBackground showTab={showTab}>
        {showLogo && (
          <BodyTitleSection>
            <LogoSection>
              <LogoTextLight>Lift</LogoTextLight>
              <LogoTextDark>Link</LogoTextDark>
            </LogoSection>
          </BodyTitleSection>
        )}

        {showAvatar && (
          <AvatarComponent
            showGreetings={showGreetings}
            fullName={title}
            imageUrl={imageUrl}
          />
        )}
        {showMenu && <Menu width={32} height={32} />}
        {showTab && (
          <TabsContainer>
            {tabList &&
              tabList.map((tab, index) => {
                return (
                  <Pressable key={index} onPress={() => tab.changePage()}>
                    <React.Fragment key={index}>
                      {tab.active ? (
                        <LogoTextDark>{tab.title}</LogoTextDark>
                      ) : (
                        <LogoTextLight>{tab.title}</LogoTextLight>
                      )}
                    </React.Fragment>
                  </Pressable>
                );
              })}
          </TabsContainer>
        )}
      </HeaderBackground>
      {children}
    </Container>
  );
};
