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
import { ServiceContextProvider } from "./src/infrastructure/service/create_service/context/service.context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// AsyncStorage.clear();
const tunnel = false;

const wsLink = new GraphQLWsLink(
  createClient({
    url: tunnel
      ? "wss://8316-198-161-203-4.ngrok-free.app/graphql/"
      : "http://192.168.1.94:8000/graphql/",
    on: {
      connected: () => console.log("ws connected"),
      error: (e) => console.log("ws error", e),
      closed: () => console.log("ws closed"),
      connecting: () => console.log("ws connecting"),
      ping: () => console.log("ws ping"),
      pong: () => console.log("ws pong"),
    },
    connectionParams: async () => {
      const token = await AsyncStorage.getItem("token");
      return {
        Authorization: token ? `JWT ${token}` : "",
      };
    },
    shouldRetry: (error) => {
      console.log("ws shouldRetry", error);
      return true;
    },
  })
);

const httpLink = createHttpLink({
  uri: tunnel
    ? "https://8316-198-161-203-4.ngrok-free.app/graphql/"
    : "http://192.168.1.94:8000/graphql/",
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
  httpLink
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
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
    "Neue-bold": require("./assets/fonts/neue-haas-grotesk-display-pro-cufonfonts/NeueHaasDisplayBold.ttf"),
    "Neue-medium": require("./assets/fonts/neue-haas-grotesk-display-pro-cufonfonts/NeueHaasDisplayMediu.ttf"),
    "Neue-black": require("./assets/fonts/neue-haas-grotesk-display-pro-cufonfonts/NeueHaasDisplayBlack.ttf"),
  });

  if (!loaded) {
    return null;
  }

  if (wsLink.subscriptionClient?.client?.readyState === WebSocket.OPEN) {
    console.log("WebSocket is connected");
  } else {
    console.log("WebSocket is not connected");
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SafeAreaComponent>
          <AuthProvider>
            <CustomerProvider>
              <ServiceContextProvider>
                <Navigator />
              </ServiceContextProvider>
            </CustomerProvider>
          </AuthProvider>
        </SafeAreaComponent>
      </ThemeProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("App", () => App);
