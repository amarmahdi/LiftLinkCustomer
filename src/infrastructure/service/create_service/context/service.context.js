import React, { useContext, useState, createContext } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FIND_DEALERSHIP, FIND_SERVICES } from "../../query";
import { CREATE_ORDER } from "../../mutation";

export const ServiceContext = createContext();

export const dealership = {
  dealershipId: "",
  dealershipName: "",
  dealershipPhoneNumber: null,
  dealershipEmail: null,
  dealershipAddress: "",
  dealershipCity: "",
  dealershipState: "",
  dealershipZipCode: "",
  dealershipCountry: "",
  dealershipWebsite: null,
  dealershipLogo: null,
  dealershipDescription: null,
  dealershipHours: null,
  dealershipLatitude: null,
  dealershipLongitude: null,
  dealershipType: null,
  dealershipRating: null,
  dealershipReviews: null,
  dealershipAverageRating: null,
  active: false,
};

export const ServiceContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  // selected car
  const [selectedCar, setSelectedCar] = useState(null);
  // selected dealership
  const [selectedDealership, setSelectedDealership] = useState(dealership);
  // dealership storage
  const [dealership, setDealership] = useState([]);
  // selected service package
  const [servicePackages, setServicePackages] = useState([]);
  // service packages from server
  const [selectedServicePackage, setSelectedServicePackage] = useState({});
  // dealership search
  const [findDealerships, { loading: dealershipLoading, data, error }] =
    useLazyQuery(FIND_DEALERSHIP);
  // service search
  const [
    findServices,
    { loading: serviceLoading, data: serviceData, error: serviceError },
  ] = useLazyQuery(FIND_SERVICES);
  // create order
  const [createOrder, { loading: orderLoading, data: orderData }] = useMutation(
    CREATE_ORDER
  );

  return (
    <ServiceContext.Provider
      value={{
        // loading
        loading,
        setLoading,
        // car selection
        selectedCar,
        setSelectedCar,
        // dealership selection
        selectedDealership,
        setSelectedDealership,
        // dealership storage
        dealership,
        setDealership,
        // dealership search
        findDealerships,
        dealershipLoading,
        data,
        error,
        // service storage
        servicePackages,
        setServicePackages,
        // service search
        findServices,
        serviceLoading,
        serviceData,
        serviceError,
        // service selection
        selectedServicePackage,
        setSelectedServicePackage,
        // create order
        createOrder,
        orderLoading,
        orderData,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
