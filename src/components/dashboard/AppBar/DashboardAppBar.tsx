import { getTranslations } from 'next-intl/server';

import { signOut } from '@/auth/auth';
import { DashboardAppBarProps } from '@/components/dashboard/AppBar/DashboardAppBar.type';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicationIcon from '@mui/icons-material/Medication';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';


export default async function DashboardAppBar({ session }: DashboardAppBarProps) {
  const t = await getTranslations('DashboardPage');

  return (
    <AppBar position='static' elevation={1}>
      <Toolbar>
        <MedicationIcon sx={{ mr: 2 }} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {t('title')}
        </Typography>
        <Typography variant='body1' sx={{ mr: 3, display: { xs: 'none', sm: 'block' } }}>
          {t.rich('welcome', {
            name: session.user?.name || '',
            bold: (chunks) => <strong>{chunks}</strong>,
          })}
        </Typography>

        {/* Logout Form using Server Action */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <Button type='submit' color='inherit' variant='outlined' startIcon={<LogoutIcon />} size='small'>
            {t('logout')}
          </Button>
        </form>
      </Toolbar>
    </AppBar>
  );
}
