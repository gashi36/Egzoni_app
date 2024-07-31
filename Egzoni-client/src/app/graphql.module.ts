import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  ApolloClientOptions,
  InMemoryCache,
  ApolloLink,
  split,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { Kind, OperationTypeNode } from 'graphql';
import { extractFiles } from './extractFiles';

const httpUri = 'http://localhost:5044/graphql';
const wsUri = 'ws://localhost:5000/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const auth = setContext((operation, { headers }) => {
    const token = localStorage.getItem('Bearer Token');
    console.log('Apollo Client setContext token:', token);
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
        'GraphQL-Preflight': '1',
      },
    };
  });

  const http = ApolloLink.from([
    auth,
    httpLink.create({ uri: httpUri, extractFiles: extractFiles }),
  ]);

  const ws = new GraphQLWsLink(createClient({ url: wsUri }));

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === Kind.OPERATION_DEFINITION &&
        definition.operation === OperationTypeNode.SUBSCRIPTION
      );
    },
    ws,
    http
  );

  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  imports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
