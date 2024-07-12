"use client";

import type { RootState } from "../../lib/store/index";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import { counterActions } from "../../lib/store/counter";
import { useEffect } from "react";
import userApi from "../../api/user-api";

export default function Home() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  const fetchUser = async () => {
    try {
      const data = await userApi.getDataDemo();
      console.log(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
      <h1>{count}</h1>
      <button
        onClick={() => {
          fetchUser();
        }}
      >
        Click to fetch
      </button>
    </main>
  );
}
