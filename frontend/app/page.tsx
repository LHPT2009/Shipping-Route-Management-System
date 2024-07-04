'use client';

import type { RootState } from '../lib/store/index';
import { useAppDispatch, useAppSelector } from "../lib/hooks/hooks";
import { counterActions } from '../lib/store/counter';

export default function Home() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main>
      <button onClick={() => dispatch(counterActions.increment())}
      >Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(counterActions.decrement())}
      >Decrement</button>
      <button onClick={() => dispatch(counterActions.incrementByAmount(2))}
      >Increment by 2</button>
    </main>
  )
}
