'use server'

import { cookies } from 'next/headers'

export async function getCookies(key: string): Promise<string | undefined> {
  return cookies().get(key)?.value;
}

export async function deleteCookies(key: string): Promise<void> {
  cookies().delete(key)
}

export async function hasCookies(key: string): Promise<boolean | undefined> {
  return cookies().has(key);
}

export async function setCookies(key: string, value: string): Promise<void> {
  cookies().set(key, value, {secure: true })
}