import AsyncStorage from "@react-native-async-storage/async-storage";

export const authenticate = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.log("Error: ", error);
  }
}
