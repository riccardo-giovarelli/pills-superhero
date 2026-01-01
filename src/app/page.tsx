import { redirect } from 'next/navigation';

import { auth } from '@/auth/auth';


export default async function Home() {
  const session = await auth();

  // User not logged in
  if (!session) {
    redirect('/login');
  }

  // User logged in
  redirect('/Dashboard');
}
