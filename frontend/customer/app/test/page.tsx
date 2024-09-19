"use client";

import type { RootState } from "../../lib/store/index";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
// import { counterActions } from "../../lib/store/auth";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "@/apollo/mutations/auth";

interface RouteItem {
  id: number;
  name: string;
  user_id: number;
}

export default function Home() {
  // const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  const [funcMutate, { loading, error, data }] = useMutation(LOGIN);

  const getErrorMessage = (error: any) => {
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const validationError = error.graphQLErrors[0].extensions.originalError;
      console.log('validationError', validationError);
    }
    return error.message;
  };

  if (loading) return <p>Loading ...</p>;
  if (error) {
    const errorMessage = getErrorMessage(error);
    console.log('error', errorMessage);
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <main>
      <h1 className="text-6xl font-bold">Test page</h1>
      <button
        onClick={async () => {
          // dispatch(counterActions.increment());
          try {
            await funcMutate({
              variables: {
                input: { email: "", password: "aB123789#" }
              }
            });
          } catch (err) {
            // Handle error here
            console.error('Caught error:', err);
          }
          // funcMutate({
          //   variables: {
          //     input: { email: "", password: "aB123789#" }
          //   }
          // })
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
