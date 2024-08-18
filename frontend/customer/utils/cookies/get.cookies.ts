'use server'

import { cookies } from 'next/headers'

export async function getCookies(key: string): Promise<string | undefined> {
  return cookies().get(key)?.value;
}