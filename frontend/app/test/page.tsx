'use client';

import { useEffect } from "react";

import type { RootState } from '../../lib/store/index';
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import { counterActions } from '../../lib/store/counter';
import { revalidatePath } from "next/cache";
import testHandle from "../../lib/route";
// import { GET } from '../api/route'

export default function Home() {
  // const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  fetch('https://pokeapi.co/api/v2/pokemon/ditto', { next: { revalidate: 2 } }).then((response: any) => {
    console.log('-------fetch-----------');
  })


  return (
    <main>
      <h1 className='text-6xl font-bold'>Test page</h1>
      <button onClick={() => { dispatch(counterActions.increment()) }}>Increment</button>
      {/* <h1>{count}</h1> */}
      <button onClick={() => {
        const response = fetch('https://pokeapi.co/api/v2/pokemon/ditto').then((response: any) => {
          console.log(response.json());
          testHandle();
        })
      }}>Click to fetch</button>
    </main>
  )
}
