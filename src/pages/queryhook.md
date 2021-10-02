---
type: "writing"
layout: "../layouts/post"
published_on: "2021-10-01"
title: "Improving API Documentation using React Query and TypeScript"
---

As your codebase grows, there is only one way to increase developer productivity: Documentation. One of many reasons I prefer TypeScript to JavaScript is that overtime, as your codebase grows, developer productivity increases because TypeScript (and typed languages in general) offer something that dynamically typed languages cannot, automatic documentation in your IDE.

This article assumes you're familiar with React Query. If you're not, I highly recommend you read the [official docs](https://react-query.tanstack.com/docs) and [this intro guide](https://www.kranthicodes.com/getting-started-with-react-query/) by [Sai Kranthi](https://www.kranthicodes.com).

## Why React Query

Imagine an simple app that does two things based on the PokeAPI:

1. Renders a list of Pokemons that link to their own dedicated page
2. Have dedicated pages for all pokemons

To fetch the list of pokemons, with **Redux** you would have to:

1. Create a global store
2. Create a reducer with an action to update the list in the store
3. Write a thunk action to fetch the data.
4. Write a useEffect hook **inside** to dispatch the thunk action.
5. Render the list.

And then you'd have to write invalidation logic, loading status logic and much more.

But with React Query, fetching your list of pokemons is as easy as wrapping your `App` in a `QueryClientProvider` and then making use of the `useQuery` and `useMutation` hooks.

Example of basic React Query usage:

<iframe
  src="https://codesandbox.io/embed/runtime-thunder-uy81c?fontsize=14&hidenavigation=1&theme=dark"
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden",
  }}
  title="queryhook-vanilla-demo"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

<br />
This approach works for simple apps like a Pokemon List, but it quickly becomes unmanageable as you add more endpoints to your API. In which case, you would have to create many such custom hooks.

This is the problem I ran into as I hopped on my first project after joining [TartanHQ](https://tartanhq.com). While it's a fairly simple CRUD app, it makes use of many endpoints and making custom hooks for each endpoint simply isn't an option.

## One Hook For All Queries

To counteract this problem, we created a layer of abstraction over React Query's `useQuery` hook, a hook that makes use of TypeScript to improve discoverability of endpoints across the entire application.

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
  key: Key,
  arg2?: Params | UseQueryOptions<Data>,
  arg3?: UseQueryOptions<Data, unknown, Data>
) {
  const params = Array.isArray(arg2) ? arg2 : [];
  const options = !!arg3 && Array.isArray(arg2) ? arg3 : arg2;

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

## Example:

Now that you're all done, you can take full advantage of VSCode autocomplete.

<img src="/static/queryhook-autocomplete.png" />

<br />

<iframe
  src="https://codesandbox.io/embed/queryhook-demo-9mjy3?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fpages%2FIndexPage.tsx&theme=dark"
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden",
  }}
  title="queryhook-demo"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
