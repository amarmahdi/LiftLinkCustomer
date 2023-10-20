import { gql } from "graphql-tag";

export const GET_USER_INFO = gql`
  query {
    getUserInfo {
      accountType
      address {
        addressId
        city
        country
        state
        street
        zipCode
      }
      car {
        carId
        carName
        carMake
        carModel
        carYear
        carType
        mileage
        carVin
        carRegistration
        carInsurance
        plateNumber
        status
        carImage {
          imageId
          imageLink
        }
        carColor
        available
      }
      profilePicture {
        createdAt
        isCurrent
        pictureId
        pictureLink
      }
      firstName
      lastName
      username
      email
      phoneNumber
      isActive
      isStaff
      isSuperuser
      lastLogin
      dateJoined
    }
  }
`;

export const IS_AUTHENTICATED = gql`
  query {
    isLoggedIn
  }
`;

export const FIND_DEALERSHIP = gql`
  query ($searchTerm: String!) {
    findDealerships(searchTerm: $searchTerm) {
      active
      dealershipName
      dealershipEmail
      dealershipState
      dealershipAddress
      dealershipZipCode
      dealershipCity
      dealershipCountry
      dealershipDescription
      dealershipId
      dealershipLogo
      dealershipZipCode
      dealershipWebsite
      dealershipPhoneNumber
    }
  }
`;

export const FIND_SERVICES = gql`
  query ($dealershipId: String!) {
    getServicePackages(dealershipId: $dealershipId) {
      dealershipId
      servicePackageDescription
      servicePackageDuration
      servicePackageId
      servicePackageName
      servicePackagePrice
      servicePackageType
    }
  }
`;
