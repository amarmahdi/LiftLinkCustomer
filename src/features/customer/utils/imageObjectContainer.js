import React, { createContext } from "react";

export const ImageContainerContext = createContext();

export const ImageContainerProvider = ({ children }) => {
  const [imageObject, setImageObject] = React.useState({});

  const clearImageObject = () => {
    setImageObject({});
  };

  return (
    <ImageContainerContext.Provider
      value={{ imageObject, setImageObject, clearImageObject }}
    >
      {children}
    </ImageContainerContext.Provider>
  );
};
