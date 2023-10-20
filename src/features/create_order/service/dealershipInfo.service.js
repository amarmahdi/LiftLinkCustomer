export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    return { latitude, longitude };
  } catch (error) {
    console.log("error", error);
  }
};

export const getDirections = async (destination) => {};

export const getGeocode = async (address, city, state) => {
  // try {
  //   const geocode = await fetch(
  //     `http://127.0.0.1:5001/ll-v2-4a68f/us-central1/geocode?address=${address}&city=${city}&state=${state}`
  //   );
  //   console.log("geocode", geocode);
  //   const geocodeJson = await geocode.json();
  //   console.log("geocodeJson", geocodeJson);
  //   return geocodeJson;
  // } catch (error) {
  //   console.log("error", error.message);
  // }
  console.log("address", address);
  console.log("city", city);
  console.log("state", state);
  fetch(
    `http://127.0.0.1:5001/ll-v2-4a68f/us-central1/geocode?address=${address}&city=${city}&state=${state}`
  )
    .then((res) => {
      console.log("res", res);
    })
    .catch((error) => {
      console.log("error##############", error);
    });
};
