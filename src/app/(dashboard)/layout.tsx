import { redirect } from 'next/navigation';

import { DashboardLayoutPropsType } from '@/app/(dashboard)/layout.type';
import { auth } from '@/auth/auth';
import DashboardAppBar from '@/components/dashboard-components/AppBar/DashboardAppBar';
import AppDrawer from '@/components/dashboard-components/AppDrawer/AppDrawer';
import { Box, Toolbar } from '@mui/material';


export default async function DashboardLayout({ children }: DashboardLayoutPropsType) {
  const session = await auth();

  // Redirect to login if the user is not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      <DashboardAppBar session={session} />

      {/* Invisible spacer */}
      <Toolbar />

      {/* Main content */}
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 1 }}>
        {children}
      </Box>

      {/* Side Bar */}
      <AppDrawer />
    </Box>
  );
}
