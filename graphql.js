import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { merge } from 'lodash';

const wsLink = new WebSocketLink({
  uri: 'ws://192.168.1.94:8000/graphql/',
  options: {
    reconnect: true
  }
});

const httpLink = createHttpLink({
  uri: 'http://192.168.1.94:8000/graphql/'
});

const authLink = setContext(async ({ headers }) => {
  try {
    const token = await AsyncStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : ''
      }
    };
  } catch (error) {
    console.log('Error retrieving token from AsyncStorage:', error);
    return {
      headers: {
        ...headers
      }
    };
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        paginatedOrders: {
          merge(existing, incoming) {
            return merge(existing, incoming);
          }
        }
      }
    }
  }
});

export const client = new ApolloClient({
  link: splitLink,
  cache,
  credentials: 'include'
});