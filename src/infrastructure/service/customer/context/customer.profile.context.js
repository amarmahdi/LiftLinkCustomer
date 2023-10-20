import React, { createContext, useContext, useState, useEffect } from "react";
import { CustomerContext } from "./customer.context";

export const CustomerProfileContext = createContext();

export const CustomerProfileProvider = ({ children }) => {
  const { profile, loading } = useContext(CustomerContext);
  const tabarr = [
    {
      title: "User Profile",
      active: true,
      path: "CustomerProfile",
      changePage: () => {
        setPage("CustomerProfile");
      },
    },
    {
      title: "Car(s) Info",
      active: false,
      path: "CustomerCarInfo",
      changePage: () => {
        setPage("CustomerCarInfo");
      },
    },
  ];
  const [tabs, setTabs] = useState(tabarr);
  const [page, setPage] = useState("CustomerProfile");

  useEffect(() => {
    if (page == "CustomerProfile") {
      tabarr[0].active = true;
      tabarr[1].active = false;
      setTabs(tabarr);
    } else if (page == "CustomerCarInfo") {
      tabarr[0].active = false;
      tabarr[1].active = true;
      setTabs(tabarr);
    }
  }, [page]);

  return (
    <CustomerProfileContext.Provider
      value={{
        tabs,
        page,
        profile,
        loading,
        setPage,
      }}
    >
      {children}
    </CustomerProfileContext.Provider>
  );
};
