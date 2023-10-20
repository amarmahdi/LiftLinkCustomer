// eslint-disable-next-line import/no-cycle
import { ThemeProvider } from "styled-components";
import { Navigator } from "./src/infrastructure/navigation/index";
import { theme } from "./src/infrastructure/theme";
import { useFonts } from "expo-font";
import { SafeAreaComponent } from "./src/components/utils/safearea.component";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppRegistry } from "react-native";
import { AuthProvider } from "./src/infrastructure/service/authentication/context/auth.context";
import { CustomerProvider } from "./src/infrastructure/service/customer/context/customer.context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { fbApp } from "./firebase-config";
import { CustomerProfileProvider } from "./src/infrastructure/service/customer/context/customer.profile.context";
import { ServiceContextProvider } from "./src/infrastructure/service/create_service/context/service.context";

// AsyncStorage.clear();

const wsLink = new WebSocketLink({
  uri: "ws://192.168.1.94:8000/graphql/",
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: "http://192.168.1.94:8000/graphql/",
});

const authLink = setContext(async ({ headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          paginatedOrders: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  credentials: "include",
});

export default function App() {
  const [loaded] = useFonts({
    "PPAgrandir-Regular": require("./assets/fonts/Agrandir/PPAgrandir-Regular.otf"),
    "PPAgrandir-WideLight": require("./assets/fonts/Agrandir/PPAgrandir-WideLight.otf"),
    "PPAgrandir-GrandHeavy": require("./assets/fonts/Agrandir/PPAgrandir-GrandHeavy.otf"),
    "PPMori-ExtraLight": require("./assets/fonts/PPMori/PPMori-Extralight.otf"),
    "PPMori-SemiBold": require("./assets/fonts/PPMori/PPMori-SemiBold.otf"),
    "PPMori-Regular": require("./assets/fonts/PPMori/PPMori-Regular.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SafeAreaComponent>
          <AuthProvider>
            <CustomerProvider>
              <ServiceContextProvider>
                <CustomerProfileProvider>
                  <Navigator />
                </CustomerProfileProvider>
              </ServiceContextProvider>
            </CustomerProvider>
          </AuthProvider>
        </SafeAreaComponent>
      </ThemeProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("App", () => App);
