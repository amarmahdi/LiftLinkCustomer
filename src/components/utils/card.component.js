import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Spacer } from "./spacer.component";
import DestinationIcon from "../../../assets/svgs/destinationIcon";
import CalendarIcon from "../../../assets/svgs/calendar2";
import { LabelComponent } from "../typography";
import { format } from "date-fns";
import { isObjEmpty } from "../../features/main/screen/main.screen";
import { ChipComponent } from "./chip.component";

const CardItem = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  width: ${(props) => props.width || "100%"};
  max-height: ${(props) => props.height || "100%"};
  border: 1px solid
    ${(props) =>
      props.bordered ? props.theme.colors.formColors.border : "transparent"};
  border-radius: 20px;
  gap: 10px;
  position: relative;
`;

const DateTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  width: 100%;
`;

const ContentView = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${(props) => props.alignItems || "flex-start"};
  align-self: flex-start;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.title};
`;

const Name = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: center;
`;

const PhoneDisplay = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.title};
`;

const DarkBgImg = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const CardPadding = styled.View`
  padding: 20px;
`;

const LabelContainer = styled.View`
  width: 100%;
  padding-right: 10px;
`;

const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CardComponent = ({
  key,
  children,
  data = {},
  size = {},
  style = {},
  overrideChildren = false,
  justifyContent,
  alignItems,
  order = false,
  bordered = false,
  onPress = () => {},
}) => {
  const [showDeliveryDate, setShowDeliveryDate] = useState(false);
  useEffect(() => {
    if (data.__typename !== "Valet") {
      if (!isObjEmpty(data.order) && data.order.orderStatus === "PENDING") {
        setShowDeliveryDate(true);
      }
      if (!isObjEmpty(data.order) && data.order.orderStatus === "INITIATED") {
        setShowDeliveryDate(true);
      }
    }
  }, []);
  return (
    <CardItem
      key={key}
      height={size.height}
      width={size.width}
      justifyContent={justifyContent}
      alignItems={alignItems}
      style={style}
      bordered={bordered}
      onPress={onPress}
    >
      {order && <DarkBgImg source={require("../../../assets/order.png")} />}
      <CardPadding>
        {!overrideChildren && (
          <>
            <DateTimeContainer>
              <ContentView>
                <LabelComponent inverted={true}>
                  {data.dealership.dealershipName}
                </LabelComponent>
              </ContentView>
              <ContentView alignItems="flex-end">
                <LabelComponent inverted={true}>
                  {format(new Date(data.assignDate || data.createdAt), "hh:mm a MMM dd")}
                </LabelComponent>
              </ContentView>
            </DateTimeContainer>
            <Spacer variant="top.large" />
            <ContentContainer>
              <DestinationIcon width={36} height={36} />
              <ContentView>
                <LabelComponent inverted={true}>Pickup Location</LabelComponent>
                <Spacer variant="top.xsmall" />
                <LabelContainer>
                  <LabelComponent inverted={true} title2={true}>
                    {data.order.pickupLocation}
                  </LabelComponent>
                </LabelContainer>
              </ContentView>
            </ContentContainer>
            <Spacer variant="top.medium" />
            {showDeliveryDate && (
              <ContentContainer>
                <CalendarIcon width={36} height={36} />
                <ContentView>
                  <LabelComponent inverted={true}>Delivery Date</LabelComponent>
                  <Spacer variant="top.xsmall" />
                  <LabelContainer>
                    <LabelComponent inverted={true} title2={true}>
                      {format(
                        new Date(data.order.orderDeliveryDate),
                        "MMM dd, yyyy"
                      )}
                    </LabelComponent>
                  </LabelContainer>
                </ContentView>
              </ContentContainer>
            )}
            <Spacer variant="top.medium" />
            <FooterContainer>
              <ChipComponent>
                <LabelComponent inverted={true} title2={true}>
                  {data.order.orderStatus === "PENDING"
                    ? "New Order"
                    : "In Progress"}
                </LabelComponent>
              </ChipComponent>
              <Spacer variant="top.large" />
              <LabelComponent title2={true} inverted={true}>
                {data.order.orderId.substring(0, 6).toUpperCase()}
              </LabelComponent>
            </FooterContainer>
          </>
        )}
        {overrideChildren && children}
      </CardPadding>
    </CardItem>
  );
};
