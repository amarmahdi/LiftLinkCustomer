import { gql } from "graphql-tag";

export const GET_CustomerS_SUBSCRIPTION = gql`
subscription($userId: String!) {
  orderSubscription(userId: $userId) {
    event {
      orderId
      orderStatus
      orderType
      assignedTo {
        userId
        username
        email
        accountType
        firstName
        lastName
      }
      customer {
        userId
        username
        email
        accountType
        firstName
        lastName
      }
      orderAddress{
        addressId
				address
        city
        province
        postalCode
        country
      }
      CustomerServiceDate
    }
  }
}
`;