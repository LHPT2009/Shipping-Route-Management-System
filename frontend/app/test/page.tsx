"use client";

import type { RootState } from "../../lib/store/index";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import { counterActions } from "../../lib/store/counter";
import { useQuery } from "@apollo/client";
import { GET_ROUTES } from "@/query/route";

interface RouteItem {
  id: number;
  name: string;
  user_id: number;
}

export default function Home() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery(GET_ROUTES, {
    pollInterval: 500,
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error ...</p>;
  const listItem = data.getRoutes;
  return (
    <main>
      <h1 className="text-6xl font-bold">Test page</h1>
      <button
        onClick={() => {
          dispatch(counterActions.increment());
        }}
      >
        Increment
      </button>
      <h1>Count: {count}</h1>
      <p>____________________________</p>
      <ul>
        Load data:
        {/* ex 1: */}
        {listItem.map(({ id, name, user_id }: RouteItem) => (
          <li key={id}>
            {id}-{name}-{user_id}
          </li>
        ))}
        {/* ex 2:
        {listItem.map((item: any) => (
          <li key={item.id}>
            {item.id}-{item.name}-{item.user_id}
          </li>
        ))} */}
      </ul>
    </main>
  );
}
