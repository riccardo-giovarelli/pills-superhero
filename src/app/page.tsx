import { auth } from '@/auth';

import Dashboard from './dashboard/page';
import LoginPage from './login/page';


export default async function Home() {
  const session = await auth();

  // User not logged in
  if (!session) {
    return <LoginPage />;
  }

  // User logged in
  return <Dashboard />;
}
