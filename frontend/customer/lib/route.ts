'use server';

import { revalidatePath } from "next/cache";


export default async function testHandle() {
    console.log('testHandle');
    revalidatePath('/test', 'layout');
  }