import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { SchemaLink } from "@apollo/client/link/schema";
import merge from "deepmerge";
import isEqual from "lodash";
import { useMemo } from "react";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

type SchemaContext =
  | SchemaLink.ResolverContext
  | SchemaLink.ResolverContextFunction;

function createIsomorphicLink(ctx?: SchemaContext) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri: "http://localhost:3001/graphql",
    credentials: "same-origin",
  });
  return from([errorLink, httpLink]);
}

function createApolloClient(ctx?: SchemaContext) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphicLink(ctx || undefined),
    cache: new InMemoryCache(),
  });
}

interface InitApollo {
  initialState?: any;
  ctx?: SchemaContext;
}

export function initializeApollo({ ctx, initialState }: InitApollo) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx || undefined);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: any }
) {
  pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  );
  return store;
}
