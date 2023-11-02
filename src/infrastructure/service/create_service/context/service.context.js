import React, { useContext, useState, createContext } from "react";
import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  FIND_DEALERSHIP,
  FIND_SERVICES,
  GET_ASSIGNED_VALET,
  GET_STARTED_ORDERS,
  GET_USER_BY_ID,
  GET_VALET,
} from "../../query";
import { CREATE_ORDER } from "../../mutation";
import { GET_DRIVER_LOCATION } from "../../subscription";

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
  const [createOrder, { loading: orderLoading, data: orderData }] =
    useMutation(CREATE_ORDER);

  // get started orders
  const getStartedOrders = useQuery(GET_STARTED_ORDERS, {
    fetchPolicy: "network-only",
  });
  const [startedOrders, setStartedOrders] = useState([]);
  const [startedOrdersLoading, setStartedOrdersLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [startedOrderError, setStartedOrderError] = useState(false);
  const [startedOrderErrorMsg, setStartedOrderErrorMsg] = useState("");

  // get valet
  const getValet = useQuery(GET_VALET, {
    fetchPolicy: "network-only",
  });
  const [valet, setValet] = useState({});
  const [valetLoading, setValetLoading] = useState(false);
  const [valetError, setValetError] = useState(false);
  const [valetErrorMsg, setValetErrorMsg] = useState("");

  // get assigned order
  const getAssignedOrder = useQuery(GET_ASSIGNED_VALET, {
    fetchPolicy: "network-only",
  });
  const [assignedOrder, setAssignedOrder] = useState({});
  const [assignedOrderLoading, setAssignedOrderLoading] = useState(false);
  const [assignedOrderError, setAssignedOrderError] = useState(false);
  const [assignedOrderErrorMsg, setAssignedOrderErrorMsg] = useState("");

  const driverInfo = useQuery(GET_USER_BY_ID, {
    fetchPolicy: "network-only",
  });
  const [driver, setDriver] = useState({});
  const [driverLoading, setDriverLoading] = useState(false);
  const [driverError, setDriverError] = useState(false);
  const [driverErrorMsg, setDriverErrorMsg] = useState("");

  const onGetStartedOrders = async () => {
    try {
      setStartedOrdersLoading(true);
      setStartedOrders([]);
      setStartedOrderError(false);
      setStartedOrderErrorMsg("");
      const { data, error } = await getStartedOrders.refetch();
      if (data) {
        setStartedOrders(data.getOrdersByUser);
      }
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setStartedOrderError(true);
      setStartedOrderErrorMsg(error.message);
    } finally {
      setStartedOrdersLoading(false);
    }
  };

  const onGetValet = async (orderId) => {
    try {
      setValetLoading(true);
      setValet({});
      setValetError(false);
      setValetErrorMsg("");
      const { data, error } = await getValet.refetch({
        orderId,
      });
      if (data) {
        console.log(data.getValet, "############????????????")
        setValet(data.getValet);
      }
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setValetError(true);
      setValetErrorMsg(error.message);
    } finally {
      setValetLoading(false);
    }
  };

  const onGetAssignedOrder = async (orderId) => {
    try {
      setAssignedOrderLoading(true);
      setAssignedOrder({});
      setAssignedOrderError(false);
      setAssignedOrderErrorMsg("");
      const { data, error } = await getAssignedOrder.refetch({
        orderId,
      });
      if (data) {
        console.log(data.getAssignedOrder, "############????????????")
        setAssignedOrder(data.getAssignedOrder);
      }
      if (error) {
        console.log(error, "############????????????")
        throw new Error(error.message);
      }
    } catch (error) {
      setAssignedOrderError(true);
      setAssignedOrderErrorMsg(error.message);
    } finally {
      setAssignedOrderLoading(false);
    }
  };

  const onGetDriverInfo = async (driverId) => {
    try {
      setDriverLoading(true);
      setDriver({});
      setDriverError(false);
      setDriverErrorMsg("");
      const { data, error } = await driverInfo.refetch({
        userId: driverId,
      });
      if (data) {
        setDriver(data.getUserInfoById);
      }
      if (error) {
        console.log(error)
        throw new Error(error.message);
      }
    } catch (error) {
      setDriverError(true);
      setDriverErrorMsg(error.message);
    } finally {
      setDriverLoading(false);
    }
  }

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
        // get started orders
        onGetStartedOrders,
        setStartedOrders,
        startedOrders,
        startedOrdersLoading,
        startedOrderError,
        startedOrderErrorMsg,
        // selected order
        selectedOrder,
        setSelectedOrder,
        // get valet
        onGetValet,
        valet,
        setValet,
        valetLoading,
        valetError,
        valetErrorMsg,
        // get assigned order
        onGetAssignedOrder,
        assignedOrder,
        setAssignedOrder,
        assignedOrderLoading,
        assignedOrderError,
        assignedOrderErrorMsg,
        // get driver info
        onGetDriverInfo,
        driver,
        setDriver,
        driverLoading,
        driverError,
        driverErrorMsg,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
