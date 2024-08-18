'use server'

import { cookies } from 'next/headers'
 
export async function hasCookies(key: string): Promise<boolean | undefined> {
  return cookies().has(key);
}