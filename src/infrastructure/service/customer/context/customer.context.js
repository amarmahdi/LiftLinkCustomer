import React, { createContext, useState, useEffect, useContext } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_INFO } from "../../query";
import { UPDATE_NAME } from "../../mutation";
import { AuthContext } from "../../authentication/context/auth.context";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [screen, setScreen] = useState("phoneVerification");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [getUserData, { data, loading: loadingCustomer, error: errorCustomer }] =
    useLazyQuery(GET_USER_INFO);
  const [updateName] = useMutation(UPDATE_NAME);
  const {firstName, lastName} = useContext(AuthContext);

  const importUserData = async () => {
    if (!loadingCustomer && data) {
      const profilePicture =
        Object.keys(data.getUserInfo.profilePicture).length > 0
          ? data.getUserInfo.profilePicture[0]
          : {};
      console.log(data)
      data.getUserInfo.car ?? (data.getUserInfo.car = {});
      const modifiedUserInfo = { ...data.getUserInfo, profilePicture };
      setProfile(modifiedUserInfo);
    }
  };

  const updateNames = async () => {
    try {
      const { data } = await updateName({
        variables: { firstName, lastName },
      });
      console.log(data);
      let _profile = { ...profile };
      _profile.firstName = firstName;
      _profile.lastName = lastName;
      setProfile(_profile);
      return data.updateName;
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (data) {
      importUserData();
    }
  }, [data]);

  useEffect(() => {
    if (errorCustomer) {
      // console.error(errorDriver);
    }
  }, [errorCustomer]);

  useEffect(() => {
    setLoading(loadingCustomer);
  }, [loadingCustomer]);

  return (
    <CustomerContext.Provider
      value={{ profile, setProfile, loading, getUserData, screen, setScreen, updateNames }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
