"use client";

import type { RootState } from "../../lib/store/index";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
// import { counterActions } from "../../lib/store/auth";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ROUTES } from "@/query/route";

interface RouteItem {
  id: number;
  name: string;
  user_id: number;
}

export default function Home() {
  // const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  const [funcMutate, { loading, error, data }] = useMutation(GET_ROUTES);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error ...</p>;

  console.log("data", data !== undefined ? data.login?.data.accessToken : "no data");
  console.log("error", error);

  return (
    <main>
      <h1 className="text-6xl font-bold">Test page</h1>
      <button
        onClick={() => {
          // dispatch(counterActions.increment());
          funcMutate({
            variables: {
              input: { email: "giahuy200202@gmail.com", password: "abc123789" }
            }
          })
        }}
      >
        Increment
      </button>
      {/* <h1>Count: {count}</h1> */}
      <p>____________________________</p>
      <ul>
        Load data:
        {/* {listItem.map(({ id, name, user_id }: RouteItem) => (
          <li key={id}>
            {id}-{name}-{user_id}
          </li>
        ))} */}
      </ul>
    </main>
  );
}
