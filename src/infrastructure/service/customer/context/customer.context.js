import React, { createContext, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../query";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [
    getUserData,
    { data, loading: loadingCustomer, error: errorCustomer },
  ] = useLazyQuery(GET_USER_INFO);

  const importUserData = async () => {
    if (!loadingCustomer && data) {
      const profilePicture =
        Object.keys(data.getUserInfo.profilePicture).length > 0
          ? data.getUserInfo.profilePicture.find((element) => element.isCurrent)
          : {};
      data.getUserInfo.car ?? (data.getUserInfo.car = {});
      const modifiedUserInfo = { ...data.getUserInfo, profilePicture };
      setProfile(modifiedUserInfo);
    }
  };

  useEffect(() => {
    if (data) {
      importUserData();
    }
  }, [data]);

  useEffect(() => {
    if (errorCustomer) {
      console.error(errorCustomer);
    }
  }, [errorCustomer]);

  useEffect(() => {
    setLoading(loadingCustomer);
  }, [loadingCustomer]);

  return (
    <CustomerContext.Provider value={{ profile, loading, getUserData }}>
      {children}
    </CustomerContext.Provider>
  );
};
