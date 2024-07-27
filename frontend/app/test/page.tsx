"use client";

import type { RootState } from "../../lib/store/index";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import { counterActions } from "../../lib/store/counter";
import { fetchRoutes } from "@/query/demo";
import { useState } from "react";

interface RouteItem {
  id: number;
  name: string;
  user_id: number;
  // add other properties as needed
}

export default function Home() {
  const [listItem, setListItem] = useState<RouteItem[]>([]);
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();
  const datalist = fetchRoutes();
  datalist.then((a) => setListItem(a));
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
        {listItem.map((item, index) => (
          <li key={index}>
            {item.id}-{item.name}-{item.user_id}
          </li>
        ))}
      </ul>
    </main>
  );
}
