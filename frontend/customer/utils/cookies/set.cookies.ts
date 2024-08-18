'use server'

import { cookies } from 'next/headers'

export async function setCookies(key: string, value: string): Promise<void> {
  cookies().set(key, value, {secure: true })
}