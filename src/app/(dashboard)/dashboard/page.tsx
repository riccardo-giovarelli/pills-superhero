import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { JSX } from 'react';

import { auth } from '@/auth/auth';
import DashboardAppBar from '@/components/dashboard/AppBar/DashboardAppBar';
import { Box, Container } from '@mui/material';


/**
 * DashboardPage component.
 * This is a Server Component that fetches the session and renders
 * the main user interface using Material UI.
 * @returns {Promise<JSX.Element>} The rendered dashboard page.
 */
export default async function DashboardPage(): Promise<JSX.Element> {
  const session = await auth();
  const t = await getTranslations('DashboardPage');

  // Redirect to login if the user is not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Navigation Bar */}
      <DashboardAppBar session={session} />

      {/* Main Content Area */}
      <Container maxWidth='lg' sx={{ mt: 4 }}></Container>
    </Box>
  );
}
