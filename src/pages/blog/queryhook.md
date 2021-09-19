---
type: "writing"
published_on: "2021-09-20"
title: "One React Hook For All Your Data Fetching Needs"
layout: "../../layouts/post"
---

## The Current State of Server State

State management in React.js is harder than it should be. No, really, it's so convuluted that [Lee Rob](https://leerob.io/) had to write [Past, Present, and Future of React State Management](https://leerob.io/blog/react-state-management).

In my time building modern frontend applications, the most common type of state I've encountered is "server state". Server state is any state that the frontend merely consumes. Many seem to prefer the likes of Redux and Flux to handle such state which surely works, but why they do it is beyond me.

Fortunately, there's a better way: React Query. React Query is a data fetching library that lets you share your server state across your app without the fuss of maintaining a global store.

## Prerequisites

This article assumes you're familiar with React Query. If you're not, I highly recommend you read the [docs](https://react-query.tanstack.com/docs) and [this intro guide](https://www.kranthicodes.com/getting-started-with-react-query/) by [Sai Kranthi](https://www.kranthicodes.com).

## Introducing React Query

Imagine an incredibly simple app that renders a list of Pokemons.

With **Redux** you would have to:

1. Create a global store
2. Create a reducer with an action to update the list in the store
3. Write a thunk action to fetch the data.
4. Write a useEffect hook **inside** to dispatch the thunk action.
5. Render the list.

And then you'd have to manually refetch the data and update it when it's invalidated. You'd also have to manually keep track of the fetch status (`isLoading`).

In comes React Query, an incredibly simple and pragmatic way of sharing server state across components.

With React Query, fetching your list of pokemons is as easy as wrapping your `App` in a `QueryClientProvider` to make your `QueryClient` accessible throughout the app and making use of the `useQuery` and `useMutation` hooks.

```tsx:main.tsx
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./app";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

```tsx:App.tsx
import { useQuery } from "react-query";

const fetcher = () =>
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then((response) =>
    response.json()
  );

export default function App() {
  const { data, isLoading } = useQuery("GetAllPokemon", fetcher);

  if (isLoading) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      {data?.results.map((item) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  );
}
```

## Sharing Data

The previous example was fairly simple. Now imagine you had to fetch the same data in two components, you could create a custom hook to use in both components.

```tsx
import { useQuery } from "react-query";

const fetcher = () =>
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then((response) =>
    response.json()
  );

const usePokemonsQuery = () => useQuery("GetAllPokemon", fetcher);

export default usePokemonsQuery;
```

This approach works for simple apps like a Pokemon List, but it quickly becomes unmanageable as you add more endpoints to your API. In which case, you would have to create many such custom hooks.

This is the problem I ran into as I hopped on my first project after joining [TartanHQ](). While it's a fairly simple CRUD app, it makes use of many endpoints and making custom hooks for each endpoint simply isn't an option.

## One Hook For All Queries/Mutations

To counteract this problem, we created a layer of abstraction over React Query's `useQuery` hook, a hook that makes use of TypeScript to improve discoverability and usability of API endpoints across the entire application.

### Custom useQuery

JavaScript does not typecheck on runtime, hence regardless of TS Types you can pass whatever you want as params to a function. This allows us to use TypeScript's function overloading to allow conditional parameter types.

```tsx:src/hooks/useQuery.ts
import * as React from "react";
import {
  useQuery as useReactQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { queryFetchers, QueryKeys } from "~/lib/api/queries";
import { Await, Widen } from "~/types";

export function useQuery<
  Key extends Widen<QueryKeys>,
  Params = Parameters<typeof queryFetchers[Key]>,
  Data = Await<ReturnType<typeof queryFetchers[Key]>>
>(key: Key, options?: UseQueryOptions<Data>): UseQueryResult<Data>;

export function useQuery<
  Key extends QueryKeys,
  Params = Parameters<typeof queryFetchers[Key]>,
  Data = Await<ReturnType<typeof queryFetchers[Key]>>
>(
  key: Key,
  params: Params,
  options?: UseQueryOptions<Data>
): UseQueryResult<Data>;

export function useQuery<
  Key extends QueryKeys,
  Params = Parameters<typeof queryFetchers[Key]>,
  Data = Await<ReturnType<typeof queryFetchers[Key]>>
>(
  arg1: Key,
  arg2?: Params | UseQueryOptions<Data>,
  arg3?: UseQueryOptions<Data, unknown, Data>
) {
  const key = React.useMemo(() => arg1, [arg1]);
  const params = React.useMemo(() => (Array.isArray(arg2) ? arg2 : []), [arg2]);
  const options = React.useMemo(
    () => (!!arg3 && Array.isArray(arg2) ? arg3 : arg2),
    [arg2, arg3]
  );

  return useReactQuery(
    key,
    () => queryFetchers[key].apply(null, params),
    options
  );
}
```

```ts:src/lib/api/queries.ts
/**
 * Legend:
 *
 * QKEY = Query Key
 * QData = Query Data
 */

const GET_ALL_POKEMONS_QKEY = "pokemons/all" as const;
type GetAllPokemonsQData = {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
};
const getAllPokemons = (): Promise<GetAllPokemonsQData> => {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then(
    (response) => response.json() as GetAllPokemonsQData
  );
};

const POKEMON_BY_ID_QKEY = "pokemons/byId" as const;
type GetPokemonByIdQData = Record<string, unknown>;
const getPokemonById = (id: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(
    (res) => res.json() as GetPokemonByIdQData
  );
};

export type QueryKeys = typeof GET_ALL_POKEMONS_KEY | typeof POKEMON_BY_ID_QKEY;
export const queryFetchers = {
  [GET_ALL_POKEMONS_QKEY]: getAllPokemons,
  [POKEMON_BY_ID_QKEY]: getPokemonById,
} as const;
```

For example, using this hook, if a fetcher requires an argument (like `pokemons/byId`), then you're required (during development, dependent on TypeScript) to pass in the arguments as the second parameter. However, if a fetcher does not require any arguments (like `pokemons/all`), then you can use the second parameter to pass options to the underlying `useQuery` hook.

**Example:**

```tsx:src/App.tsx
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import PokemonPage from "./pages/PokemonPage";

export default function IndexPage() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route exact path="/:id">
          <PokemonPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
```

```tsx:src/pages/IndexPage.tsx
import useQuery from "./hooks/useQuery";

export default function IndexPage() {
  //> When using `pokemons/all` you can pass
  // the options as the second argument because
  // the fetcher function does not have any arguments
  const { data } = useQuery("pokemons/all", {
    onSuccess() {
      // Do something on successful fetch
    }
  });

  if (isLoading) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      {data?.results.map((item) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  );
}
```

```tsx:src/pages/PokemonPage.tsx
import useQuery from "./hooks/useQuery";
import { useParams } from "react-router-dom";

export default function PokemonPage() {
  const { id } = useParams<{ id: string }>();
  //> When using `pokemons/byId` you need to pass the
  // `id` in an array (similar to .apply) as the second argument
  // and the options as the third argument
  const { data } = useQuery("pokemons/byId", [id], {
    onSuccess() {
      // Do something on successful fetch
    },
  });

  if (isLoading) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      {data?.name}
    </div>
  );
}
```