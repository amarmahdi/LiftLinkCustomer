// import { useMutation } from "@apollo/client";
// import { Login } from "../mutation";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const LoginRequest = async ({ username, password }) => {
//   const [login, { loading, error, data }] = useMutation(Login);
//   console.log("login", login);

//   login({
//     variables: {
//       username: username,
//       password: password,
//     },
//   }).then((result) => {
//     console.log("result", result);
//   });

//   if (data) {
//     console.log("data", data);
//     await AsyncStorage.setItem("token", data.login.token);
//     return data;
//   }

//   if (error) {
//     console.log("error", error);
//     return error;
//   }
// };
