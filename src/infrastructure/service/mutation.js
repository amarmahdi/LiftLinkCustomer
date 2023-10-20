import { gql } from "graphql-tag";

export const Login = gql`
  mutation ($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
      user {
        accountType
        profilePicture {
          pictureId
          pictureLink
        }
      }
    }
  }
`;

export const Logout = gql`
  mutation logout {
    logout {
      deleted
    }
  }
`;

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation ($pictureLink: String!) {
    uploadProfilePicture(pictureLink: $pictureLink) {
      isCurrent
      createdAt
      pictureId
      pictureLink
    }
  }
`;

export const Add_CAR_INFO = gql`
  mutation ($input: CarInfoInput!) {
    addCarInfo(input: $input) {
      carId
      available
      carColor
      carImage {
        imageId
        imageLink
      }
      carInsurance
      carMake
      carModel
      carName
      carRegistration
      carType
      carVin
      carYear
      mileage
      plateNumber
      status
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation ($input: OrderInput!) {
    createOrder(input: $input) {
      createdDate
      notes
      orderDeliveryDate
      orderId
      serviceType {
        servicePackageName
      }
      pickupLocation
    }
  }
`;
