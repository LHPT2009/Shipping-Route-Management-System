'use server'

import { cookies } from 'next/headers'

export async function deleteCookies(key: string): Promise<void> {
  cookies().delete(key)
}