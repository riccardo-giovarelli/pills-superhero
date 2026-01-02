import { redirect } from 'next/navigation';
import { JSX } from 'react';

import { auth, signOut } from '@/auth/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicationIcon from '@mui/icons-material/Medication';
import {
    AppBar, Box, Button, Card, CardContent, Container, Divider, Toolbar, Typography
} from '@mui/material';


/**
 * DashboardPage component.
 * This is a Server Component that fetches the session and renders
 * the main user interface using Material UI.
 * @returns {Promise<JSX.Element>} The rendered dashboard page.
 */
export default async function DashboardPage(): Promise<JSX.Element> {
  const session = await auth();

  // Redirect to login if the user is not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Navigation Bar */}
      <AppBar position='static' elevation={1}>
        <Toolbar>
          <MedicationIcon sx={{ mr: 2 }} />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Pills Superhero
          </Typography>
          <Typography variant='body1' sx={{ mr: 3, display: { xs: 'none', sm: 'block' } }}>
            Welcome, <strong>{session.user?.name}</strong>
          </Typography>

          {/* Logout Form using Server Action */}
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <Button type='submit' color='inherit' variant='outlined' startIcon={<LogoutIcon />} size='small'>
              Logout
            </Button>
          </form>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Container maxWidth='lg' sx={{ mt: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom fontWeight='bold'>
          Dashboard
        </Typography>

        <Typography variant='body1' color='text.secondary' paragraph>
          Manage your medication inventory and refill reminders.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Inventory Placeholder Section */}
        <Card variant='outlined' sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant='h6' component='h2' gutterBottom display='flex' alignItems='center'>
              <MedicationIcon sx={{ mr: 1, color: 'primary.main' }} />
              Medication Inventory
            </Typography>
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: 'grey.50',
                borderRadius: 1,
                border: '1px dashed',
                borderColor: 'grey.300',
              }}
            >
              <Typography variant='body2' color='text.secondary' fontStyle='italic'>
                No medications registered at the moment.
              </Typography>
              <Button variant='contained' sx={{ mt: 2 }} size='small'>
                Add First Medication
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
