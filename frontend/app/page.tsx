'use client';

import type { RootState } from '../lib/store/index';
import { useAppDispatch, useAppSelector } from "../lib/hooks/hooks";
import { counterActions } from '../lib/store/counter';
import Link from 'next/link';


export default function Home() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(counterActions.increment())}>Increment</button>
      <h1>{count}</h1>
      <Link href="/test">Click to test</Link>
    </div>
  )
}
